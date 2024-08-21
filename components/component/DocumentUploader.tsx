import React, { useState, useCallback, useMemo, useRef } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface AnalysisResult {
  text: string;
  stats: {
    total_words: number;
    unique_words: number;
    total_sentences: number;
    total_paragraphs: number;
    total_pages: number;
    average_sentence_length: number;
    average_word_length: number;
    average_words_per_page: number;
    most_common_words: { [key: string]: number };
    flesch_kincaid_grade: number;
    complex_word_count: number;
    complex_word_percentage: number;
    synthesis: string;
    named_entities: { [key: string]: string[] };
  };
  keyword_results: {
    keyword: string;
    occurrences: number;
    positions: { sentence: string; position: number; relevance_score: number }[];
  }[];
  total_words: number;
  keyword_density: { [key: string]: number };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const FileUpload = React.memo(({ onFileChange, onKeywordsChange, onUpload, uploading }) => (
  <Card className="mb-8">
    <CardContent className="pt-6">
      <div className="flex items-center justify-center space-x-4">
        <Input 
          type="file" 
          onChange={onFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <Input 
          type="text" 
          placeholder="Enter keywords (comma-separated)" 
          onChange={onKeywordsChange}
          className="mr-4 px-4 py-2 rounded-lg border border-gray-300"
        />
        <Button
          onClick={onUpload}
          disabled={uploading}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Document"
          )}
        </Button>
      </div>
    </CardContent>
  </Card>
));

const ErrorAlert = React.memo(({ message }) => (
  <Alert variant="destructive" className="mb-4">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
));

const OverviewTab = React.memo(({ stats }) => (
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-semibold text-gray-800">Document Overview</h2>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries({
          'Total Words': stats.total_words,
          'Unique Words': stats.unique_words,
          'Total Sentences': stats.total_sentences,
          'Total Paragraphs': stats.total_paragraphs,
          'Total Pages': stats.total_pages,
          'Average Words per Page': stats.average_words_per_page.toFixed(2)
        }).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {value}</p>
        ))}
      </div>
    </CardContent>
  </Card>
));

const ChartTab = React.memo(({ stats }) => {
  const wordDistributionData = useMemo(() => [
    { name: 'Total Words', value: stats.total_words },
    { name: 'Unique Words', value: stats.unique_words },
    { name: 'Complex Words', value: stats.complex_word_count },
  ], [stats]);

  const commonWordsData = useMemo(() => 
    Object.entries(stats.most_common_words)
      .map(([word, count]) => ({ name: word, value: count }))
      .slice(0, 5),
    [stats.most_common_words]
  );

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">Word Distribution</h2>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wordDistributionData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">Top 5 Most Common Words</h2>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={commonWordsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {commonWordsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
});

const ReadabilityTab = React.memo(({ stats }) => {
  const readabilityData = useMemo(() => [
    { name: 'Flesch-Kincaid Grade', value: stats.flesch_kincaid_grade },
    { name: 'Avg Sentence Length', value: stats.average_sentence_length },
    { name: 'Avg Word Length', value: stats.average_word_length },
  ], [stats]);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold text-gray-800">Readability Metrics</h2>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {Object.entries({
            'Flesch-Kincaid Grade Level': stats.flesch_kincaid_grade.toFixed(2),
            'Average Sentence Length': `${stats.average_sentence_length.toFixed(2)} words`,
            'Average Word Length': `${stats.average_word_length.toFixed(2)} characters`,
            'Complex Word Percentage': `${stats.complex_word_percentage.toFixed(2)}%`
          }).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={readabilityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

const SynthesisTab = React.memo(({ synthesis }) => (
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-semibold text-gray-800">Document Synthesis</h2>
    </CardHeader>
    <CardContent>
      <p className="text-gray-700">{synthesis}</p>
    </CardContent>
  </Card>
));

const KeywordsTab = React.memo(({ keywordResults, keywordDensity }) => (
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-semibold text-gray-800">Keyword Analysis</h2>
    </CardHeader>
    <CardContent>
      {keywordResults.map((result) => (
        <Card key={result.keyword} className="mt-4">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-800">
              Keyword: {result.keyword} (Occurrences: {result.occurrences}, 
              Density: {(keywordDensity[result.keyword] || 0).toFixed(2)}%)
            </h3>
          </CardHeader>
          <CardContent>
            <ul>
              {result.positions.map(({ sentence, position, relevance_score }, index) => (
                <li key={index}>
                  <strong>Sentence {position + 1} (Relevance: {relevance_score.toFixed(2)}):</strong> {sentence}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </CardContent>
  </Card>
));

const EntitiesTab = React.memo(({ namedEntities }) => (
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-semibold text-gray-800">Named Entities</h2>
    </CardHeader>
    <CardContent>
      {Object.entries(namedEntities).map(([entityType, entities]) => (
        <div key={entityType} className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{entityType}</h3>
          <ul className="list-disc list-inside">
            {entities.map((entity, index) => (
              <li key={index}>{entity}</li>
            ))}
          </ul>
        </div>
      ))}
    </CardContent>
  </Card>
));

const DocumentAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  }, []);

  const handleKeywordsChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) {
      setError("Please select a file to analyze.");
      return;
    }
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("keywords", keywords);

    try {
      const response = await axios.post("http://localhost:8000/analyse/analyse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error("Error analyzing document:", error);
      setError("An error occurred while analyzing the document. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [file, keywords]);

  const handleDownloadPDF = useCallback(async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('document-analysis.pdf');
  }, [contentRef]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Document Analyzer</h1>
      
      <FileUpload 
        onFileChange={handleFileChange}
        onKeywordsChange={handleKeywordsChange}
        onUpload={handleUpload}
        uploading={uploading}
      />

      {error && <ErrorAlert message={error} />}

      {uploading && (
        <p className="text-center text-gray-600">Analyzing your document, please wait...</p>
      )}

      {analysisResult && (
        <div ref={contentRef}>
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="readability">Readability</TabsTrigger>
              <TabsTrigger value="synthesis">Synthesis</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="entities">Entities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab stats={analysisResult.stats} />
            </TabsContent>

            <TabsContent value="charts">
              <ChartTab stats={analysisResult.stats} />
            </TabsContent>

            <TabsContent value="readability">
              <ReadabilityTab stats={analysisResult.stats} />
            </TabsContent>

            <TabsContent value="synthesis">
              <SynthesisTab synthesis={analysisResult.stats.synthesis} />
            </TabsContent>

            <TabsContent value="keywords">
              <KeywordsTab keywordResults={analysisResult.keyword_results} keywordDensity={analysisResult.keyword_density} />
            </TabsContent>

            <TabsContent value="entities">
              <EntitiesTab namedEntities={analysisResult.stats.named_entities} />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {analysisResult && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleDownloadPDF}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-200"
          >
            Download PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentAnalyzer;

"use client"
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const JsonAnalyzer: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const analysis = {
        type: Array.isArray(parsedJson) ? 'array' : 'object',
        length: Array.isArray(parsedJson) ? parsedJson.length : Object.keys(parsedJson).length,
        keys: Object.keys(parsedJson),
        depth: getJsonDepth(parsedJson),
      };
      setAnalysis(analysis);
      setError(null);
    } catch (err) {
      setError('Invalid JSON. Please check your input.');
      setAnalysis(null);
    }
  };

  const getJsonDepth = (obj: any): number => {
    if (typeof obj !== 'object' || obj === null) return 0;
    return 1 + Math.max(...Object.values(obj).map(getJsonDepth));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">JSON Analyzer</h2>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste your JSON here..."
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        onClick={analyzeJson}
      >
        Analyze JSON
      </button>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      )}
      {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold text-lg mb-2">Analysis Results:</h3>
          <ul className="list-disc list-inside">
            <li>Type: {analysis.type}</li>
            <li>Length: {analysis.length}</li>
            <li>Keys: {analysis.keys.join(', ')}</li>
            <li>Max Depth: {analysis.depth}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default JsonAnalyzer;
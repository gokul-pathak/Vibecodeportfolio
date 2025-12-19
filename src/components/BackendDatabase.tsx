import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Search, Play, Table, Columns, FileCode, Clock, CheckCircle } from 'lucide-react';

interface QueryResult {
  query: string;
  data: any[];
  columns: string[];
  rowCount: number;
  executionTime: string;
}

export function BackendDatabase() {
  const [activeTable, setActiveTable] = useState<string>('developer_info');
  const [queryInput, setQueryInput] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Database schema
  const tables = {
    developer_info: {
      columns: ['id', 'name', 'title', 'location', 'email', 'github', 'linkedin', 'years_experience'],
      data: [
        {
          id: 1,
          name: 'Your Name',
          title: 'Senior Backend Engineer',
          location: 'Nepal',
          email: 'your.email@example.com',
          github: 'github.com/yourusername',
          linkedin: 'linkedin.com/in/yourusername',
          years_experience: 5,
        },
      ],
    },
    skills: {
      columns: ['id', 'category', 'skill_name', 'proficiency_level', 'years_used'],
      data: [
        { id: 1, category: 'Languages', skill_name: 'JavaScript/TypeScript', proficiency_level: 'Expert', years_used: 5 },
        { id: 2, category: 'Languages', skill_name: 'Python', proficiency_level: 'Expert', years_used: 4 },
        { id: 3, category: 'Languages', skill_name: 'Java', proficiency_level: 'Advanced', years_used: 3 },
        { id: 4, category: 'Backend', skill_name: 'Node.js/Express', proficiency_level: 'Expert', years_used: 5 },
        { id: 5, category: 'Backend', skill_name: 'Django/FastAPI', proficiency_level: 'Expert', years_used: 4 },
        { id: 6, category: 'Backend', skill_name: 'Spring Boot', proficiency_level: 'Advanced', years_used: 3 },
        { id: 7, category: 'Database', skill_name: 'PostgreSQL', proficiency_level: 'Expert', years_used: 5 },
        { id: 8, category: 'Database', skill_name: 'MongoDB', proficiency_level: 'Expert', years_used: 4 },
        { id: 9, category: 'Database', skill_name: 'Redis', proficiency_level: 'Advanced', years_used: 3 },
        { id: 10, category: 'API', skill_name: 'REST API Design', proficiency_level: 'Expert', years_used: 5 },
        { id: 11, category: 'API', skill_name: 'GraphQL', proficiency_level: 'Advanced', years_used: 2 },
        { id: 12, category: 'API', skill_name: 'gRPC', proficiency_level: 'Intermediate', years_used: 1 },
      ],
    },
    projects: {
      columns: ['id', 'project_name', 'tech_stack', 'description', 'role', 'duration_months', 'status'],
      data: [
        {
          id: 1,
          project_name: 'E-Commerce Platform API',
          tech_stack: 'Node.js, PostgreSQL, Redis, Docker',
          description: 'Built scalable REST API handling 10M+ requests/day',
          role: 'Lead Backend Engineer',
          duration_months: 12,
          status: 'Production',
        },
        {
          id: 2,
          project_name: 'Real-time Chat Service',
          tech_stack: 'Python, FastAPI, WebSockets, MongoDB',
          description: 'Developed real-time messaging system with 100K concurrent users',
          role: 'Senior Developer',
          duration_months: 8,
          status: 'Production',
        },
        {
          id: 3,
          project_name: 'Payment Gateway Integration',
          tech_stack: 'Java, Spring Boot, MySQL, RabbitMQ',
          description: 'Integrated multiple payment providers with 99.99% uptime',
          role: 'Backend Engineer',
          duration_months: 6,
          status: 'Production',
        },
        {
          id: 4,
          project_name: 'Analytics Pipeline',
          tech_stack: 'Python, Apache Kafka, PostgreSQL',
          description: 'Built data pipeline processing 50GB+ daily',
          role: 'Data Engineer',
          duration_months: 10,
          status: 'Production',
        },
      ],
    },
    experience: {
      columns: ['id', 'company', 'position', 'start_date', 'end_date', 'description', 'technologies'],
      data: [
        {
          id: 1,
          company: 'Tech Corp',
          position: 'Senior Backend Engineer',
          start_date: '2022-01-01',
          end_date: 'Present',
          description: 'Lead backend team, architect microservices, mentor junior developers',
          technologies: 'Node.js, Python, PostgreSQL, AWS, Docker, Kubernetes',
        },
        {
          id: 2,
          company: 'Startup Inc',
          position: 'Backend Developer',
          start_date: '2020-03-01',
          end_date: '2021-12-31',
          description: 'Built REST APIs, optimized database queries, implemented caching',
          technologies: 'Python, Django, MongoDB, Redis, Docker',
        },
        {
          id: 3,
          company: 'Digital Solutions',
          position: 'Junior Backend Developer',
          start_date: '2018-06-01',
          end_date: '2020-02-28',
          description: 'Developed API endpoints, wrote unit tests, fixed bugs',
          technologies: 'Node.js, Express, MySQL, Git',
        },
      ],
    },
    certifications: {
      columns: ['id', 'certification_name', 'issuer', 'issue_date', 'credential_id', 'status'],
      data: [
        {
          id: 1,
          certification_name: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          issue_date: '2023-06-15',
          credential_id: 'AWS-SAA-2023-XYZ',
          status: 'Active',
        },
        {
          id: 2,
          certification_name: 'MongoDB Certified Developer',
          issuer: 'MongoDB University',
          issue_date: '2022-09-20',
          credential_id: 'MDB-DEV-2022-ABC',
          status: 'Active',
        },
        {
          id: 3,
          certification_name: 'Oracle Certified Java Programmer',
          issuer: 'Oracle',
          issue_date: '2021-03-10',
          credential_id: 'OCP-JAVA-2021-DEF',
          status: 'Active',
        },
      ],
    },
  };

  const sampleQueries = [
    'SELECT * FROM developer_info;',
    'SELECT * FROM skills WHERE category = "Backend";',
    'SELECT project_name, tech_stack, status FROM projects;',
    'SELECT company, position, start_date FROM experience ORDER BY start_date DESC;',
    'SELECT certification_name, issuer FROM certifications WHERE status = "Active";',
  ];

  useEffect(() => {
    // Auto-execute initial query on mount
    if (activeTable) {
      const initialQuery = `SELECT * FROM ${activeTable};`;
      setQueryInput(initialQuery);
      executeQuery(initialQuery);
    }
  }, []);

  const executeQuery = (query: string) => {
    setIsExecuting(true);

    setTimeout(() => {
      const normalizedQuery = query.trim().toLowerCase();
      
      // Simple SQL parser for demo purposes
      let tableName = activeTable;
      let result: any[] = [];
      let columns: string[] = [];

      // Extract table name from query
      const fromMatch = normalizedQuery.match(/from\s+(\w+)/);
      if (fromMatch) {
        tableName = fromMatch[1];
      }

      // Check if table exists
      if (tables[tableName as keyof typeof tables]) {
        const table = tables[tableName as keyof typeof tables];
        columns = table.columns;
        result = [...table.data];

        // Handle WHERE clause
        const whereMatch = normalizedQuery.match(/where\s+(.+?)(?:;|$)/);
        if (whereMatch) {
          const whereClause = whereMatch[1].trim();
          const conditionMatch = whereClause.match(/(\w+)\s*=\s*"([^"]+)"/);
          
          if (conditionMatch) {
            const [, column, value] = conditionMatch;
            result = result.filter(row => 
              row[column]?.toString().toLowerCase() === value.toLowerCase()
            );
          }
        }

        // Handle SELECT columns
        const selectMatch = query.match(/SELECT\s+(.+?)\s+FROM/i);
        if (selectMatch && selectMatch[1].trim() !== '*') {
          const selectedColumns = selectMatch[1].split(',').map(col => col.trim());
          columns = selectedColumns;
          result = result.map(row => {
            const filteredRow: any = {};
            selectedColumns.forEach(col => {
              if (row[col] !== undefined) filteredRow[col] = row[col];
            });
            return filteredRow;
          });
        }

        // Handle ORDER BY
        const orderMatch = normalizedQuery.match(/order\s+by\s+(\w+)(?:\s+(asc|desc))?/);
        if (orderMatch) {
          const [, column, direction = 'asc'] = orderMatch;
          result.sort((a, b) => {
            const aVal = a[column];
            const bVal = b[column];
            const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            return direction === 'desc' ? -comparison : comparison;
          });
        }
      }

      setQueryResult({
        query,
        data: result,
        columns,
        rowCount: result.length,
        executionTime: `${(Math.random() * 50 + 10).toFixed(2)} ms`,
      });
      setIsExecuting(false);
    }, 800);
  };

  const handleExecute = () => {
    if (queryInput.trim()) {
      executeQuery(queryInput);
    }
  };

  const handleQuickQuery = (query: string) => {
    setQueryInput(query);
    executeQuery(query);
  };

  return (
    <section id="backend-database" className="relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
            <Database className="w-5 h-5 text-red-400" />
            <span className="text-red-400 text-sm font-mono">Backend Engineering Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Database</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore my portfolio data through SQL queries. Select tables and execute queries to view structured information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Tables */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/20 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-slate-800/50 border-b border-red-500/20 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Table className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-mono">Tables</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {Object.keys(tables).map(tableName => (
                  <button
                    key={tableName}
                    onClick={() => {
                      setActiveTable(tableName);
                      setQueryInput(`SELECT * FROM ${tableName};`);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200 ${
                      activeTable === tableName
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-lg'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Columns className="w-4 h-4" />
                      {tableName}
                    </div>
                  </button>
                ))}
              </div>

              {/* Schema Info */}
              <div className="border-t border-red-500/20 p-5">
                <div className="text-xs text-slate-400 font-mono">
                  <div className="mb-3 text-red-400">Schema:</div>
                  {activeTable && (
                    <div className="space-y-1.5">
                      {tables[activeTable as keyof typeof tables].columns.map(col => (
                        <div key={col} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          <span className="text-slate-300">{col}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Queries */}
            <div className="mt-6 bg-slate-900/80 backdrop-blur-xl border border-red-500/20 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-slate-800/50 border-b border-red-500/20 px-5 py-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-mono">Quick Queries</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {sampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuery(query)}
                    className="w-full text-left px-4 py-2.5 rounded-lg font-mono text-xs text-slate-400 hover:bg-slate-800/50 hover:text-slate-300 transition-all duration-200 break-all"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Query Editor */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/20 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-slate-800/50 border-b border-red-500/20 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-mono">SQL Query Editor</span>
                </div>
                <button
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="flex items-center gap-2 px-5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/30 font-mono text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-4 h-4" />
                  Execute
                </button>
              </div>
              <div className="p-6">
                <textarea
                  ref={inputRef}
                  value={queryInput}
                  onChange={e => setQueryInput(e.target.value)}
                  onKeyDown={e => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                      handleExecute();
                    }
                  }}
                  className="w-full h-40 bg-slate-950/50 text-green-400 font-mono text-sm p-5 rounded-lg border border-slate-700 focus:border-red-500/50 outline-none resize-none transition-colors"
                  placeholder="Enter SQL query..."
                  spellCheck={false}
                />
                <div className="mt-4 text-xs text-slate-500 font-mono flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400 border border-slate-700">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400 border border-slate-700">Enter</kbd>
                  <span>to execute query</span>
                </div>
              </div>
            </div>

            {/* Query Results */}
            <AnimatePresence mode="wait">
              {isExecuting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/80 backdrop-blur-xl border border-red-500/20 rounded-xl p-12 text-center shadow-2xl"
                >
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-red-400 border-t-transparent mb-4" />
                  <div className="text-slate-400 font-mono text-sm">Executing query...</div>
                </motion.div>
              ) : queryResult ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/80 backdrop-blur-xl border border-red-500/20 rounded-xl overflow-hidden shadow-2xl"
                >
                  {/* Results Header */}
                  <div className="bg-slate-800/50 border-b border-red-500/20 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-mono">Query Successful</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                        <Clock className="w-4 h-4" />
                        {queryResult.executionTime}
                      </div>
                    </div>
                    <div className="text-slate-400 text-sm font-mono">
                      {queryResult.rowCount} row{queryResult.rowCount !== 1 ? 's' : ''} returned
                    </div>
                  </div>

                  {/* Results Table */}
                  <div className="overflow-x-auto">
                    {queryResult.data.length > 0 ? (
                      <table className="w-full font-mono text-sm">
                        <thead>
                          <tr className="border-b border-slate-700">
                            {queryResult.columns.map(col => (
                              <th
                                key={col}
                                className="px-6 py-4 text-left text-red-400 bg-slate-800/40 whitespace-nowrap"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.data.map((row, index) => (
                            <tr
                              key={index}
                              className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                            >
                              {queryResult.columns.map(col => (
                                <td
                                  key={col}
                                  className="px-6 py-4 text-slate-300 whitespace-nowrap"
                                >
                                  {row[col] !== null && row[col] !== undefined ? String(row[col]) : 'NULL'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-12 text-center text-slate-400 font-mono text-sm">
                        Query returned no results
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/80 backdrop-blur-xl border border-red-500/20 rounded-xl p-16 text-center shadow-2xl"
                >
                  <Database className="w-20 h-20 text-slate-600 mx-auto mb-6" />
                  <div className="text-slate-400 font-mono mb-3">No query executed yet</div>
                  <div className="text-slate-500 font-mono text-sm max-w-md mx-auto">
                    Write a SQL query above and click Execute, or select a quick query from the sidebar
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
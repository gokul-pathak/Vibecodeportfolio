import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, Server, Github, Mail, Linkedin, ExternalLink } from 'lucide-react';

interface CommandHistory {
  command: string;
  output: string[];
  type: 'success' | 'error' | 'info';
}

export function DevOpsConsole() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Show welcome message on mount
  useEffect(() => {
    setHistory([
      {
        command: '',
        output: [
          '╔══════════════════════════════════════════════════════════════╗',
          '║  Welcome to the DevOps Portfolio Terminal v2.0              ║',
          '║  Developer: [Your Name] | System: Linux 5.15.0-ubuntu       ║',
          '╚══════════════════════════════════════════════════════════════╝',
          '',
          'Type "help" to see available commands.',
          'Type "about" to learn about the developer.',
          '',
        ],
        type: 'info',
      },
    ]);
  }, []);

  const developerData = {
    name: 'Your Name',
    title: 'Full-Stack Developer & DevOps Engineer',
    location: 'Nepal',
    email: 'your.email@example.com',
    github: 'github.com/yourusername',
    linkedin: 'linkedin.com/in/yourusername',
    website: 'yourportfolio.com',
    skills: [
      'Frontend: React, TypeScript, Next.js, Tailwind CSS',
      'Backend: Node.js, Express, Python, Django',
      'DevOps: Docker, Kubernetes, AWS, Terraform, Jenkins',
      'Database: PostgreSQL, MongoDB, Redis',
      'CI/CD: GitHub Actions, GitLab CI, CircleCI',
      'Monitoring: Prometheus, Grafana, ELK Stack',
    ],
    experience: [
      {
        role: 'Senior DevOps Engineer',
        company: 'Tech Company',
        duration: '2022 - Present',
        description: 'Led infrastructure automation and CI/CD pipeline development',
      },
      {
        role: 'Full-Stack Developer',
        company: 'Startup Inc',
        duration: '2020 - 2022',
        description: 'Built scalable web applications using React and Node.js',
      },
      {
        role: 'Junior Developer',
        company: 'Digital Agency',
        duration: '2018 - 2020',
        description: 'Developed frontend interfaces and REST APIs',
      },
    ],
    projects: [
      {
        name: 'Cloud Infrastructure Automation',
        tech: 'Terraform, AWS, Kubernetes',
        description: 'Automated deployment of microservices on AWS using IaC',
      },
      {
        name: 'CI/CD Pipeline Platform',
        tech: 'Jenkins, Docker, GitHub Actions',
        description: 'Built enterprise CI/CD platform reducing deployment time by 60%',
      },
      {
        name: 'Monitoring Dashboard',
        tech: 'Prometheus, Grafana, Node Exporter',
        description: 'Real-time infrastructure monitoring for 50+ servers',
      },
    ],
    certifications: [
      'AWS Certified Solutions Architect',
      'Kubernetes Administrator (CKA)',
      'Docker Certified Associate',
    ],
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: string[] = [];
    let type: 'success' | 'error' | 'info' = 'success';

    switch (trimmedCmd) {
      case '':
        return;

      case 'help':
        output = [
          'Available commands:',
          '',
          '  about          - Display developer information',
          '  whoami         - Show current user profile',
          '  skills         - List technical skills',
          '  experience     - Show work experience',
          '  projects       - Display portfolio projects',
          '  certifications - List certifications',
          '  contact        - Show contact information',
          '  resume         - Download resume (simulated)',
          '  git log        - Show career timeline',
          '  docker ps      - Show current tech stack',
          '  kubectl info   - Display infrastructure expertise',
          '  clear          - Clear terminal screen',
          '  help           - Show this help message',
          '',
        ];
        type = 'info';
        break;

      case 'about':
      case 'whoami':
        output = [
          `┌─────────────────────────────────────────────┐`,
          `│ Name:     ${developerData.name.padEnd(33)} │`,
          `│ Title:    ${developerData.title.padEnd(33)} │`,
          `│ Location: ${developerData.location.padEnd(33)} │`,
          `└─────────────────────────────────────────────┘`,
          '',
          'A passionate developer specializing in full-stack development',
          'and DevOps practices. Expert in building scalable cloud-native',
          'applications with modern technologies and best practices.',
          '',
        ];
        break;

      case 'skills':
      case 'ls skills':
        output = [
          '📦 Technical Skills:',
          '',
          ...developerData.skills.map(skill => `  ✓ ${skill}`),
          '',
        ];
        break;

      case 'experience':
      case 'git log':
        output = [
          '💼 Work Experience:',
          '',
          ...developerData.experience.flatMap((exp, index) => [
            `${index + 1}. ${exp.role} @ ${exp.company}`,
            `   Duration: ${exp.duration}`,
            `   ${exp.description}`,
            '',
          ]),
        ];
        break;

      case 'projects':
      case 'ls projects':
        output = [
          '🚀 Portfolio Projects:',
          '',
          ...developerData.projects.flatMap((project, index) => [
            `${index + 1}. ${project.name}`,
            `   Tech Stack: ${project.tech}`,
            `   ${project.description}`,
            '',
          ]),
        ];
        break;

      case 'certifications':
      case 'cat certifications':
        output = [
          '🏆 Certifications:',
          '',
          ...developerData.certifications.map((cert, index) => `  ${index + 1}. ${cert}`),
          '',
        ];
        break;

      case 'contact':
      case 'cat contact.txt':
        output = [
          '📧 Contact Information:',
          '',
          `  Email:    ${developerData.email}`,
          `  GitHub:   ${developerData.github}`,
          `  LinkedIn: ${developerData.linkedin}`,
          `  Website:  ${developerData.website}`,
          '',
        ];
        break;

      case 'resume':
      case 'download resume':
        output = [
          '📄 Resume Download:',
          '',
          '  [Simulated] Downloading resume.pdf...',
          '  ████████████████████████ 100%',
          '  ✓ Download complete!',
          '',
          '  In a real application, this would trigger a PDF download.',
          '',
        ];
        break;

      case 'docker ps':
        output = [
          'CONTAINER ID   IMAGE              STATUS       TECH STACK',
          'a3f8c9d1e2b4   react:latest       Up 5 years   React + TypeScript',
          'b4e9d2f3a5c6   node:18-alpine     Up 4 years   Node.js + Express',
          'c5f1e3d4b6a7   python:3.11        Up 3 years   Python + Django',
          'd6a2f4e5c7b8   postgres:15        Up 4 years   PostgreSQL',
          'e7b3a5f6d8c9   redis:7-alpine     Up 3 years   Redis Cache',
          'f8c4b6a7e9d1   nginx:alpine       Up 5 years   Nginx',
          '',
        ];
        type = 'info';
        break;

      case 'kubectl info':
      case 'kubectl get pods':
        output = [
          '☸ Kubernetes & Infrastructure Expertise:',
          '',
          '  ✓ Container Orchestration (Kubernetes, Docker Swarm)',
          '  ✓ Infrastructure as Code (Terraform, Ansible)',
          '  ✓ Cloud Platforms (AWS, Azure, GCP)',
          '  ✓ CI/CD Pipelines (Jenkins, GitHub Actions, GitLab CI)',
          '  ✓ Monitoring & Logging (Prometheus, Grafana, ELK)',
          '  ✓ Service Mesh (Istio, Linkerd)',
          '',
        ];
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      case 'exit':
      case 'logout':
        output = [
          'Thank you for visiting!',
          'To change role, click the role indicator in the top right.',
          '',
        ];
        type = 'info';
        break;

      case 'sudo rm -rf /':
      case 'rm -rf /':
        output = [
          '⚠️  PERMISSION DENIED!',
          '',
          'Nice try! But this is a portfolio, not a real server 😄',
          '',
        ];
        type = 'error';
        break;

      case 'ping google.com':
        output = [
          'PING google.com (142.250.185.46): 56 data bytes',
          '64 bytes from 142.250.185.46: icmp_seq=0 ttl=117 time=12.3 ms',
          '64 bytes from 142.250.185.46: icmp_seq=1 ttl=117 time=11.8 ms',
          '64 bytes from 142.250.185.46: icmp_seq=2 ttl=117 time=12.1 ms',
          '',
          '--- google.com ping statistics ---',
          '3 packets transmitted, 3 packets received, 0.0% packet loss',
          '',
        ];
        type = 'info';
        break;

      default:
        output = [
          `bash: ${cmd}: command not found`,
          '',
          'Type "help" to see available commands.',
          '',
        ];
        type = 'error';
        break;
    }

    setHistory(prev => [...prev, { command: cmd, output, type }]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/95 backdrop-blur-xl border border-green-500/30 rounded-lg overflow-hidden shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="bg-slate-800/70 border-b border-green-500/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-mono">root@portfolio:~#</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="hidden sm:inline">DevOps Portfolio Terminal</span>
              <span className="flex items-center gap-1">
                <Server className="w-3 h-3" />
                Online
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
            className="p-6 font-mono text-sm h-[600px] overflow-y-auto bg-black/60 cursor-text"
          >
            {/* Command History */}
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                {item.command && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-400">root@portfolio:~#</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                )}
                <div className="ml-0">
                  {item.output.map((line, i) => (
                    <div
                      key={i}
                      className={`${
                        item.type === 'success'
                          ? 'text-green-300'
                          : item.type === 'error'
                          ? 'text-red-300'
                          : 'text-blue-300'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-green-400">root@portfolio:~#</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white caret-green-400"
                autoFocus
                spellCheck={false}
              />
              <span
                className={`inline-block w-2 h-4 bg-green-400 ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                } transition-opacity`}
              />
            </form>
          </div>

          {/* Terminal Footer */}
          <div className="bg-slate-800/70 border-t border-green-500/30 px-4 py-2 flex items-center justify-between text-xs font-mono">
            <div className="text-slate-400">
              Press <kbd className="px-2 py-1 bg-slate-700 rounded text-green-400">↑</kbd> or{' '}
              <kbd className="px-2 py-1 bg-slate-700 rounded text-green-400">↓</kbd> for command history
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span>Type "help" for commands</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Command Hints */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap gap-2 justify-center"
        >
          {['help', 'about', 'skills', 'projects', 'contact'].map(cmd => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                inputRef.current?.focus();
              }}
              className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-green-400 rounded-lg border border-green-500/20 hover:border-green-500/50 text-sm font-mono transition-all"
            >
              {cmd}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

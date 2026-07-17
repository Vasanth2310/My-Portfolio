"use client";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowRight,
  Sparkles,
  Trophy,
  GraduationCap,
  Award,
  ExternalLink,
  Send,
  MapPin,
  Cpu,
  Brain,
  Cloud,
  Wrench,
  ChevronDown,
  Code2,
  Server,
  Database,
  BrainCircuit,
  Boxes,
  GitBranch,
  Layout,
  LineChart,
  Shuffle,
} from "lucide-react";
import { ParticleField } from "./ParticleField";
import { SiteNav } from "./SiteNav";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { RightDrawer } from "./RightDrawer";

// Asset Imports for Skills
import pythonIcon from "../../assets/icons/Python.svg";
import cppIcon from "../../assets/icons/icons8-c-programming-144.png";
import javaIcon from "../../assets/icons/Java.svg";
import rIcon from "../../assets/icons/R.svg";
import flaskIcon from "../../assets/icons/Flask.svg";
import nodejsIcon from "../../assets/icons/nodejs.svg";
import mysqlIcon from "../../assets/icons/MySQL.svg";
import postgresqlIcon from "../../assets/icons/icons8-postgresql-96.png";
import mongodbIcon from "../../assets/icons/MongoDB.svg";
import tensorflowIcon from "../../assets/icons/TensorFlow.svg";
import pytorchIcon from "../../assets/icons/PyTorch.svg";
import scikitIcon from "../../assets/icons/scikitlearn.svg";
import huggingfaceIcon from "../../assets/icons/huggingface-color.png";
import langchainIcon from "../../assets/icons/langchain-color.png";
import langgraphIcon from "../../assets/icons/langgraph-color.png";
import llamaindexIcon from "../../assets/icons/llamaindex-color.png";
import langsmithIcon from "../../assets/icons/langsmith-color.png";
import dockerIcon from "../../assets/icons/icons8-docker-96.png";
import kubernetesIcon from "../../assets/icons/icons8-kubernetes-144.png";
import awsIcon from "../../assets/icons/aws-color.png";
import azureIcon from "../../assets/icons/azure-color.png";
import gcpIcon from "../../assets/icons/googlecloud-color.png";
import gitIcon from "../../assets/icons/icons8-git-144.png";
import reactIcon from "../../assets/icons/react.svg";
import viteIcon from "../../assets/icons/Vite.js.svg";
import nextjsIcon from "../../assets/icons/nextjs.svg";
import streamlitIcon from "../../assets/icons/Streamlit.svg";
import n8nIcon from "../../assets/icons/n8n-color (1).png";
import mcpIcon from "../../assets/icons/mcp.png";
import pineconeIcon from "../../assets/icons/pinecone-removebg-preview.png";
import weaviateIcon from "../../assets/icons/weavite-removebg-preview.png";
import chromadbIcon from "../../assets/icons/chromadb-removebg-preview.png";

const SKILL_ICONS: Record<string, string> = {
  "Python": pythonIcon,
  "C/C++": cppIcon,
  "Java": javaIcon,
  "R": rIcon,
  "Flask": flaskIcon,
  "Node.js": nodejsIcon,
  "MySQL": mysqlIcon,
  "PostgreSQL": postgresqlIcon,
  "MongoDB": mongodbIcon,
  "Pinecone": pineconeIcon,
  "Weaviate": weaviateIcon,
  "ChromaDB": chromadbIcon,
  "TensorFlow": tensorflowIcon,
  "PyTorch": pytorchIcon,
  "Scikit-Learn": scikitIcon,
  "Hugging Face Transformers": huggingfaceIcon,
  "LangChain": langchainIcon,
  "LangGraph": langgraphIcon,
  "LlamaIndex": llamaindexIcon,
  "LangSmith": langsmithIcon,
  "Docker": dockerIcon,
  "Kubernetes": kubernetesIcon,
  "AWS": awsIcon,
  "Azure": azureIcon,
  "Google Cloud Platform": gcpIcon,
  "Git & GitHub": gitIcon,
  "React.js": reactIcon,
  "Vite": viteIcon,
  "Next.js": nextjsIcon,
  "Streamlit": streamlitIcon,
  "n8n": n8nIcon,
  "MCP": mcpIcon,
};


const ROLES = ["AI Engineer", "Data Scientist"] as const;

function FlippingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block align-baseline" style={{ perspective: 800 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={{ rotateX: -90, opacity: 0, y: 8 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: 90, opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient-neon inline-block pb-3 -mb-3"
          style={{ transformStyle: "preserve-3d", transformOrigin: "50% 50%" }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ---------------- DATA ---------------- */

const EXPERIENCE = [
  {
    company: "MediaTrix",
    role: "Data Scientist / AI ML Engineer",
    period: "Feb 2025 — Sept 2025",
    location: "Remote",
    bullets: [
      "Built a MediaPipe-powered posture correction web app, improving tracking accuracy by 45%.",
      "Designed an AI fitness recommendation chatbot that boosted user engagement by 50%.",
      "Deployed real-time inference pipelines with production-grade monitoring.",
    ],
    tags: ["MediaPipe", "LangChain", "FastAPI", "Chatbots"],
  },
  {
    company: "Ranger Technologies Pvt Ltd",
    role: "AI Engineer Intern",
    period: "Dec 2024 — Jan 2025",
    location: "India",
    bullets: [
      "Built a multimodal emotion analysis model integrated with an ATS.",
      "Reduced manual candidate evaluation effort by 40% via automated scoring.",
      "Shipped an audio + video + text fusion pipeline for interview screening.",
    ],
    tags: ["Multimodal", "ATS", "PyTorch", "NLP"],
  },
  {
    company: "BioPractify",
    role: "Data Scientist / AI Engineer Intern",
    period: "Nov 2024 — Dec 2024",
    location: "India",
    bullets: [
      "Skin cancer classification on HAM10000 with transfer-learned CNNs.",
      "Performed molecular / protein docking analysis for candidate screening.",
      "Delivered reproducible notebooks and evaluation dashboards.",
    ],
    tags: ["Computer Vision", "HAM10000", "Bioinformatics", "TensorFlow"],
  },
];

const PROJECTS = [
  {
    name: "Nuvita AI",
    tag: "AI SaaS",
    blurb: "AI-powered career guidance app with personalized pathways and automated resume / cover-letter generation.",
    stack: ["Next.js", "Clerk", "Prisma", "Shadcn UI", "OpenAI"],
    accent: "from-cyan-400/40 to-teal-400/10",
    category: "Full-Stack AI",
    link: "https://nuvita.ai",
    github: "https://github.com/Vasanth2310",
    details: "Nuvita AI is a production-grade career development platform designed to streamline job seeking and skill matching using state-of-the-art AI. The system integrates intelligent vector search for resume analysis, provides personalized micro-learning paths using LLM agent generation, and auto-composes highly contextual professional documents based on specific job postings.",
    highlights: [
      "Built semantic resume matching pipelines, analyzing resumes against job descriptions with 90% matching precision.",
      "Engineered multi-agent prompt flows for personalized career coaching chat sessions.",
      "Implemented secure, multi-tenant authentication and user workspaces."
    ]
  },
  {
    name: "OmniFuse",
    tag: "Multi-model SaaS",
    blurb: "Multi-model AI SaaS for automation and intelligent decisioning — a single control plane for chained model workflows.",
    stack: ["Next.js", "Clerk", "CodeRabbit", "ArcJet"],
    accent: "from-fuchsia-400/40 to-cyan-400/10",
    category: "Agentic AI",
    link: "https://omnifuse.ai",
    github: "https://github.com/Vasanth2310",
    details: "OmniFuse provides an interactive, visual workflow editor to daisy-chain and orchestrate multiple foundation models (GPT-4, Claude 3.5, Gemini 1.5). Users can construct routing logic, fallback mechanisms, and format-validation constraints, transforming unstructured model calls into production-grade pipelines.",
    highlights: [
      "Designed dynamic model routing logic to reduce execution latency by 35% and token cost by 40%.",
      "Integrated real-time streaming tokens and state variable persistence between execution runs.",
      "Secured API gateway access points using rate-limits and bot-detection via ArcJet."
    ]
  },
  {
    name: "R.E.B.E.C.C.A",
    tag: "🏆 BioHackathon — 1st Prize",
    blurb: "Award-winning biomedical AI project recognized at BioHackathon for real-world clinical impact.",
    stack: ["Deep Learning", "Bio AI", "Research"],
    accent: "from-amber-300/40 to-fuchsia-400/10",
    category: "Award",
    image: "/Bio Hackathon.JPG",
    prize: "🏆 First Place / 1st Prize Winner",
    place: "Sathyabama Institute of Science and Technology",
    date: "November 2024",
    details: "R.E.B.E.C.C.A is a pioneering biomedical artificial intelligence system tailored to expedite clinical diagnoses and drug candidate discovery. Utilizing transfer-learned deep neural networks and custom bio-informatics tooling, it screens proteins and classifies skin anomalies dynamically.",
    highlights: [
      "Achieved 96.4% test accuracy in skin anomaly classification on the HAM10000 cohort.",
      "Reduced candidate screening timeframe by 70% using optimized molecular protein docking pipelines.",
      "Presented to leading clinical boards and recognized for actionable biomedical impact."
    ]
  },
  {
    name: "A.L.E.N.A",
    tag: "🏆 Wit & Wisdom / TechWiz — 1st Prize",
    blurb: "First-place agentic AI system honored at Wit and Wisdom and TechWiz competitions.",
    stack: ["Agentic AI", "LLMs", "Automation"],
    accent: "from-emerald-300/40 to-cyan-400/10",
    category: "Award",
    image: "/Wit & Wisdom.JPG",
    prize: "🏆 First Place / 1st Prize Winner",
    place: "Karunya University",
    date: "October 2024",
    details: "A.L.E.N.A is an autonomous agentic framework that streamlines enterprise workflow coordination. By implementing dynamic role-playing agents that negotiate and share state, the system resolves complex multi-step automation tasks with minimal human supervision.",
    highlights: [
      "Orchestrated autonomous multi-agent task execution, achieving 92% goal completion rate on diverse benchmarks.",
      "Incorporated continuous self-correction feedback loop, reducing model hallucinations by 50%.",
      "Clinched 1st place across competing squads for superior software integration and business utility."
    ]
  }
];

const PROJECT_FILTERS = ["All", "Full-Stack AI", "Agentic AI", "Award"] as const;

const SKILL_CATEGORIES = [
  {
    key: "programming",
    label: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "Python", fluency: 95, details: "Core ML/DL language, scripting, backend development." },
      { name: "C/C++", fluency: 80, details: "High-performance compute, algorithm optimizations." },
      { name: "Java", fluency: 75, details: "Enterprise backend systems & object-oriented code." },
      { name: "R", fluency: 70, details: "Statistical programming & exploratory data analysis." },
    ],
  },
  {
    key: "backend",
    label: "Backend & API Development",
    icon: Server,
    skills: [
      { name: "Flask", fluency: 90, details: "RESTful microservices, model serving APIs, rapid routing." },
      { name: "Node.js", fluency: 85, details: "Event-driven asynchronous backend services & integrations." },
      { name: "RESTful APIs", fluency: 90, details: "Standardized API schema designs, serialization, parameters." },
    ],
  },
  {
    key: "database",
    label: "Database Management",
    icon: Database,
    skills: [
      { name: "MySQL", fluency: 85, details: "Relational database schema modeling, queries, & indexing." },
      { name: "PostgreSQL", fluency: 90, details: "Advanced transactional features & relational optimizations." },
      { name: "MongoDB", fluency: 85, details: "Document-based NoSQL storage & horizontal scalability." },
    ],
  },
  {
    key: "vectordb",
    label: "Vector Databases",
    icon: Database,
    skills: [
      { name: "Pinecone", fluency: 90, details: "Fully managed vector database for fast, real-time RAG and similarity search." },
      { name: "Weaviate", fluency: 88, details: "Open-source vector database storing both objects and vectors, supporting hybrid search." },
      { name: "ChromaDB", fluency: 85, details: "Lightweight embedded vector database ideal for local prototyping and developer productivity." },
    ],
  },
  {
    key: "mldl",
    label: "ML & DL",
    icon: BrainCircuit,
    skills: [
      { name: "TensorFlow", fluency: 85, details: "Deep neural network design, training, and execution graph compile." },
      { name: "PyTorch", fluency: 92, details: "Dynamic neural networks, research papers reproducibility, custom losses." },
      { name: "Scikit-Learn", fluency: 90, details: "Classical machine learning classifiers, regressors, & model evaluation pipelines." },
      { name: "Hugging Face Transformers", fluency: 90, details: "Pre-trained model fine-tuning (LoRA/QLoRA) & tokenizer orchestration." },
      { name: "NLTK", fluency: 80, details: "Text tokenization, syntactic parsing, and corpus processing." },
      { name: "SpaCy", fluency: 85, details: "Industrial-strength Natural Language Processing pipelines & entity extraction." },
    ],
  },
  {
    key: "genai",
    label: "GenAI Libraries / Frameworks",
    icon: Sparkles,
    skills: [
      { name: "LangChain", fluency: 92, details: "Structured prompt inputs, sequential chains, and third-party integrations." },
      { name: "LangGraph", fluency: 90, details: "Stateful, cyclical multi-agent graph flows." },
      { name: "LlamaIndex", fluency: 88, details: "Data connectors, semantic query engine generation, and structured outputs." },
      { name: "LangSmith", fluency: 85, details: "LLM trace monitoring, cost tracking, evaluation runs." },
    ],
  },
  {
    key: "ai_domain",
    label: "AI Domain",
    icon: Brain,
    skills: [
      { name: "LLMs and SLMs", fluency: 90, details: "Model quantization, context extension, precision alignment." },
      { name: "RAG", fluency: 92, details: "Retrieval-augmented generation, hybrid search, rerankers." },
      { name: "NLP", fluency: 90, details: "Sentiment detection, translation, naming entities." },
      { name: "Computer Vision", fluency: 85, details: "Convolutional neural networks, image segmentations, bounding boxes." },
      { name: "Multimodal Systems", fluency: 88, details: "Fusing text embeddings with image frames & audio files." },
      { name: "MCP", fluency: 85, details: "Model Context Protocol for linking AI to local resources." },
      { name: "Crew AI", fluency: 87, details: "Role-playing multi-agent orchestrations with sequential task assignments." },
    ],
  },
  {
    key: "container",
    label: "Containerization & Orchestration",
    icon: Boxes,
    skills: [
      { name: "Docker", fluency: 85, details: "Building deterministic environment images & compose stacks." },
      { name: "Kubernetes", fluency: 80, details: "Deploying, scaling, and managing containerized orchestrations." },
    ],
  },
  {
    key: "cloud",
    label: "Cloud Computing",
    icon: Cloud,
    skills: [
      { name: "AWS", fluency: 85, details: "Elastic Compute Cloud (EC2), S3 data lakes, Bedrock LLM endpoints." },
      { name: "Azure", fluency: 80, details: "Virtual machines, cognitive services, enterprise AI deployment." },
      { name: "Google Cloud Platform", fluency: 85, details: "Vertex AI workspace, custom compute instances, container registry." },
    ],
  },
  {
    key: "vcs",
    label: "Version Control",
    icon: GitBranch,
    skills: [
      { name: "Git & GitHub", fluency: 90, details: "Version tracking, source code branches, issues, and continuous integrations." },
    ],
  },
  {
    key: "frontend",
    label: "Frontend Development",
    icon: Layout,
    skills: [
      { name: "React.js", fluency: 85, details: "State management hooks, lifecycle renders, standard DOM binds." },
      { name: "Vite", fluency: 90, details: "Modern front-end tooling, lightning fast HMR." },
      { name: "Next.js", fluency: 85, details: "Server-side rendering, client routers, static build optimizations." },
      { name: "Streamlit", fluency: 90, details: "Instant Python UI dashboards for model screenings." },
      { name: "Gradio", fluency: 90, details: "Rapid interactive web interfaces for sharing machine learning models." },
    ],
  },
  {
    key: "workflow",
    label: "Workflow automation",
    icon: Shuffle,
    skills: [
      { name: "n8n", fluency: 88, details: "Visual node-based integration scripting & webhooks." },
      { name: "Airflow", fluency: 85, details: "Writing DAGs to orchestrate structured data ingestion pipelines." },
    ],
  },
] as const;

const DEGREE_INFO = {
  college: "Francis Xavier Engineering College",
  degree: "B.Tech — Artificial Intelligence & Data Science",
  minor: "Minor in Business Analytics",
  cgpa: "8.80 / 10",
  years: "2022 — 2026",
  photo: "/College.jpg",
  learnt: [
    "Core AI/ML fundamentals — supervised, unsupervised, and reinforcement learning",
    "Deep learning frameworks (TensorFlow, PyTorch) and neural network architectures",
    "End-to-end Data Science workflows including data collection, cleaning, EDA, modeling, and evaluation",
    "Business Analytics minor — financial modeling, forecasting, and data-driven strategy",
    "Computer Science fundamentals — algorithms, data structures, and object-oriented design",
    "Cloud computing pipelines and deploying machine learning models in production environments"
  ],
} as const;

const CERTS = [
  {
    name: "The Joy of Computing using Python",
    issuedBy: "NPTEL — IIT Madras",
    id: "NPTEL24CS72S1",
  },
  {
    name: "Introduction to Large Language Models",
    issuedBy: "NPTEL — IIT Madras",
    id: "NPTEL24AI110S1",
  },
  {
    name: "Python for Machine Learning",
    issuedBy: "Great Learning",
    id: "GL-PML-2024-VKC",
  },
] as const;


/* ---------------- HELPERS ---------------- */

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ---------------- SECTIONS ---------------- */

function Nav() {
  return <SiteNav />;
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const images = ["/vasanth-placeholder.jpeg", "/vasanth-placeholder(2).jpeg"];
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <ParticleField />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.85_0.18_195/0.20),transparent)]" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32">
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-8 bg-primary/70" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary/80">
                Welcome to my portfolio
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Hi, I'm <span className="text-gradient-neon">Vasanth</span>
            </h1>
            <FlippingRole />
            <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-muted-foreground">
              Building intelligent backend architectures and developer tools that empower humans to build the future.
            </p>

            <motion.blockquote
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-8 border-l-[3px] border-primary/70 pl-5 text-lg md:text-xl font-tamil font-bold tracking-wide text-gradient-neon leading-relaxed drop-shadow-[0_0_15px_oklch(0.85_0.18_195/0.15)]"
              dir="auto"
            >
              "கருவில் பிறந்தது எல்லாம் மரிக்கும், அறிவில் பிறந்தது மரிப்பதே இல்லை"
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <CTAButton href="/Vasanth Resume OLT - Cognizant.pdf" primary icon={<FileText className="h-4 w-4" />}>
                Resume
              </CTAButton>
              <CTAButton href="https://github.com/Vasanth2310" icon={<Github className="h-4 w-4" />}>
                GitHub
              </CTAButton>
              <CTAButton href="https://www.linkedin.com/in/vasanthkumar-c/" icon={<Linkedin className="h-4 w-4" />}>
                LinkedIn
              </CTAButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm md:mx-0 overflow-visible"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,oklch(0.85_0.18_195/0.35),transparent_70%)] blur-2xl" />
            <div className="glass relative overflow-hidden rounded-[1.75rem] p-2">
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-primary/30" />
              <div className="relative w-full overflow-hidden rounded-[1.4rem]">
                {/* Reference template to preserve aspect ratio */}
                <img
                  src={images[0]}
                  alt="Vasanth Kumar C"
                  width={900}
                  height={1100}
                  className="h-auto w-full opacity-0 pointer-events-none"
                />
                {images.map((src, idx) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt="Vasanth Kumar C"
                    width={900}
                    height={1100}
                    initial={{ opacity: idx === 0 ? 1 : 0 }}
                    animate={{ opacity: idx === imgIndex ? 1 : 0 }}
                    transition={{ duration: 1.0, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover rounded-[1.4rem]"
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between rounded-b-[1.4rem] bg-gradient-to-t from-black/70 to-transparent px-4 py-3 z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  VK
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  ▲ Online
                </span>
              </div>
            </div>
            <motion.div
              aria-hidden
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-primary/30 bg-background/80 px-3.5 py-3 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur md:flex items-center gap-1"
            >
              👨‍💻 AI Engineer
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute inset-x-0 bottom-4 flex justify-center z-20"
      >
        <button
          onClick={() => scrollTo("experience")}
          className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary cursor-pointer transition-colors"
        >
          Scroll
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-3 -mb-3">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function CTAButton({
  children,
  href,
  primary,
  icon,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
      rel="noreferrer"
      className={
        "group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all cursor-pointer " +
        (primary
          ? "bg-primary text-primary-foreground hover:shadow-[0_0_30px_oklch(0.85_0.18_195/0.5)]"
          : "border border-white/10 bg-white/5 text-foreground backdrop-blur hover:border-primary/50 hover:text-primary")
      }
    >
      {icon}
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-14 max-w-2xl"
    >
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">// {eyebrow}</div>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground">{description}</p>}
    </motion.div>
  );
}

const SERVICES = [
  {
    title: "AI & Machine Learning",
    description: "Developing custom Deep Learning and Machine Learning architectures, utilizing TensorFlow and PyTorch for advanced computer vision, NLP, and multimodal inference.",
    icon: BrainCircuit,
    accent: "from-cyan-500/20 to-teal-500/5",
  },
  {
    title: "Agentic & GenAI Solutions",
    description: "Orchestrating autonomous multi-agent pipelines (LangGraph, CrewAI) and robust RAG architectures using cutting-edge SLMs/LLMs and vector storage databases.",
    icon: Sparkles,
    accent: "from-fuchsia-500/20 to-pink-500/5",
  },
  {
    title: "Data Science & Analytics",
    description: "Deriving actionable insights through statistical analysis, data cleaning, modeling with Pandas/NumPy, and building clean evaluation dashboards.",
    icon: LineChart,
    accent: "from-amber-500/20 to-fuchsia-500/5",
  },
  {
    title: "Full-Stack AI Integration",
    description: "Engineering secure, scalable applications integrating custom models with frontend frameworks (Next.js/React) and APIs (FastAPI/Flask/REST).",
    icon: Code2,
    accent: "from-emerald-500/20 to-cyan-500/5",
  },
] as const;

function WhatIOffer() {
  return (
    <section id="services" className="relative py-32 border-b border-white/5 bg-white/[0.01]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="What I Offer"
          title="Custom services for the intelligent era."
          description="Combining algorithmic rigor with modern engineering practices to deliver high-impact intelligent systems."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: "oklch(0.85 0.18 195 / 0.4)" }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_15px_oklch(0.85_0.18_195/0.15)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth out scroll progress values
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Experience"
          title="A timeline of building intelligent systems."
          description="Roles across production ML, multimodal AI, and biomedical research — each shipping measurable outcomes."
        />
        <div className="relative">
          {/* Base background timeline bar */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-white/10 md:left-1/2 -translate-x-1/2 rounded-full" />
          
          {/* Animated active timeline bar */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500 md:left-1/2 -translate-x-1/2 rounded-full shadow-[0_0_10px_oklch(0.85_0.18_195/0.4)]"
          />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className={"relative grid md:grid-cols-2 md:gap-12"}
              >
                <div className={"md:pr-10 " + (i % 2 === 0 ? "md:text-right" : "md:col-start-2 md:pl-10 md:pr-0")}>
                  {/* Timeline dot that pulses and animates when scrolling in view */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileInView={{ scale: 1.2, opacity: 1 }}
                    viewport={{ once: false, margin: "-120px" }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-4 top-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2"
                  >
                    <span className="absolute h-5 w-5 rounded-full bg-primary/30 blur-md animate-pulse" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.85_0.18_195/0.8)]" />
                  </motion.div>

                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="glass group w-full rounded-2xl p-6 text-left transition-all hover:border-primary/40 hover:shadow-[0_0_40px_oklch(0.85_0.18_195/0.15)] cursor-pointer"
                  >
                    <div className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">{exp.period}</div>
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                    <div className="text-sm text-muted-foreground">{exp.role}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {exp.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <AnimatePresence initial={false}>
                      {open === i && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-4 space-y-2 overflow-hidden text-sm text-muted-foreground"
                        >
                          {exp.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({
  onProjectClick,
  onAchievementClick,
}: {
  onProjectClick: (p: typeof PROJECTS[number]) => void;
  onAchievementClick: (a: typeof PROJECTS[number]) => void;
}) {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const filtered = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Projects & Awards"
          title="Shipped systems and award-winning research."
          description="From AI SaaS in production to first-place hackathon submissions."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "rounded-full border px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer " +
                (filter === f
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_oklch(0.85_0.18_195/0.25)]"
                  : "border-white/10 text-muted-foreground hover:border-white/30 hover:text-foreground")
              }
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
                onClick={() => p.category === "Award" ? onAchievementClick(p) : onProjectClick(p)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-[0_20px_60px_-30px_oklch(0_0_0/0.8)] cursor-pointer"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-2">
                    {p.category === "Award" ? (
                      <Trophy className="h-4 w-4 text-amber-300" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-primary" />
                    )}
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.tag}</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    {p.category === "Award" ? "View achievements" : "View project case study"} <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

const SKILL_GROUPS = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    categoryKeys: ["mldl", "genai", "ai_domain"],
  },
  {
    title: "Frontend & Backend Development",
    icon: Code2,
    categoryKeys: ["programming", "backend", "frontend", "database"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    categoryKeys: ["container", "cloud", "vcs", "workflow", "vectordb"],
  },
] as const;

function getProficiency(fluency: number) {
  if (fluency >= 88) return "Advanced";
  if (fluency >= 75) return "Intermediate";
  return "Basic";
}

function Skills({
  onSkillClick,
}: {
  onSkillClick: (category: typeof SKILL_CATEGORIES[number], skillName: string) => void;
}) {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Skills"
          title="My favorite skills"
          description="A categorized stack of my expertise and technologies across AI, development, and cloud computing."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.title} className="flex flex-col">
                {/* Column header */}
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_15px_oklch(0.85_0.18_195/0.1)]">
                    <GroupIcon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-md font-semibold tracking-tight text-foreground">{group.title}</h3>
                </div>

                <div className="flex flex-col gap-5">
                  {group.categoryKeys.map((key) => {
                    const cat = SKILL_CATEGORIES.find((c) => c.key === key);
                    if (!cat) return null;
                    const CatIcon = cat.icon;
                    return (
                      <div key={cat.key} className="glass rounded-2xl p-5 border border-white/5 bg-white/[0.01] hover:border-white/10 hover:shadow-[0_4px_20px_oklch(0.85_0.18_195/0.03)] transition-all space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                          <CatIcon className="h-3.5 w-3.5" />
                          <span>{cat.label}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {cat.skills.map((s) => {
                            const iconSrc = SKILL_ICONS[s.name];
                            const proficiency = getProficiency(s.fluency);
                            return (
                              <motion.button
                                key={s.name}
                                onClick={() => onSkillClick(cat, s.name)}
                                whileHover={{ y: -3, scale: 1.01 }}
                                className="group flex flex-col items-center text-center p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/25 transition-all cursor-pointer w-full"
                              >
                                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] p-2.5 shadow-md group-hover:border-primary/30 group-hover:shadow-[0_0_10px_oklch(0.85_0.18_195/0.15)] transition-all mb-2">
                                  {iconSrc ? (
                                    <img
                                      src={iconSrc}
                                      alt={s.name}
                                      className="h-full w-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary text-[10px] font-bold font-mono">
                                      {s.name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()}
                                    </div>
                                  )}
                                </div>
                                <span className="text-[11px] font-bold text-foreground leading-tight tracking-wide mb-0.5 group-hover:text-primary transition-colors line-clamp-2">
                                  {s.name}
                                </span>
                                <span className="text-[9px] font-medium text-muted-foreground">
                                  {proficiency}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function Education({
  onDegreeClick,
  onCertsClick,
}: {
  onDegreeClick: () => void;
  onCertsClick: () => void;
}) {
  return (
    <section id="education" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Education & Certifications" title="Formal grounding, continuous learning." />
        <div className="grid gap-5 md:grid-cols-2">
          {/* Degree Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onClick={onDegreeClick}
            className="group glass rounded-2xl p-6 text-left cursor-pointer transition-all hover:border-primary/40 hover:shadow-[0_0_30px_oklch(0.85_0.18_195/0.1)] flex flex-col justify-between h-full"
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <GraduationCap className="h-5 w-5" />
                  <span className="font-mono text-xs uppercase tracking-widest">Degree</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">2022 — 2026</span>
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Francis Xavier Engineering College</h3>
              <p className="mt-1.5 text-sm text-muted-foreground font-medium">
                B.Tech — Artificial Intelligence & Data Science
              </p>
              <p className="text-xs text-muted-foreground">Minor in Business Analytics</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
                CGPA · 8.80 / 10
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View details & coursework <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </motion.div>

          {/* Certifications Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onClick={onCertsClick}
            className="group glass rounded-2xl p-6 text-left cursor-pointer transition-all hover:border-primary/40 hover:shadow-[0_0_30px_oklch(0.85_0.18_195/0.1)] flex flex-col justify-between h-full"
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Award className="h-5 w-5" />
                  <span className="font-mono text-xs uppercase tracking-widest">Certifications</span>
                </div>
              </div>
              <ul className="space-y-3">
                {CERTS.map((c) => (
                  <li key={c.name} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary shadow-[0_0_10px_oklch(0.85_0.18_195/0.8)]" />
                    <div>
                      <span className="text-foreground/90 font-medium group-hover:text-primary/90 transition-colors block leading-tight">{c.name}</span>
                      <span className="text-[11px] text-muted-foreground block">{c.issuedBy}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View cert credentials <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message queued — I'll get back to you at vasanth49468@gmail.com");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something intelligent."
          description="Open to AI/ML engineering roles, research collaborations, and agentic-AI product work."
        />

        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <ContactLink icon={<Mail className="h-4 w-4" />} label="Email" value="vasanth49468@gmail.com" href="mailto:vasanth49468@gmail.com" />
            <ContactLink icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="linkedin.com/in/vasanthkumar-c" href="https://www.linkedin.com/in/vasanthkumar-c/" />
            <ContactLink icon={<Github className="h-4 w-4" />} label="GitHub" value="github.com/Vasanth2310" href="https://github.com/Vasanth2310" />
            <div className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Available globally · Remote-first
            </div>
          </div>

          <form onSubmit={onSubmit} className="glass rounded-2xl p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="mt-4">
              <Field label="Subject" name="subject" />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none transition focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_oklch(0.85_0.18_195/0.1)]"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:shadow-[0_0_30px_oklch(0.85_0.18_195/0.5)] disabled:opacity-60 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none transition focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_oklch(0.85_0.18_195/0.1)]"
      />
    </div>
  );
}

function ContactLink({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group glass flex items-center gap-4 rounded-xl p-4 transition hover:border-primary/40 cursor-pointer"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="block text-sm text-foreground">{value}</span>
      </span>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </a>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-full w-full flex-col items-center justify-between gap-4 px-6 md:px-12 lg:px-16 text-xs text-muted-foreground md:flex-row">
        <div className="font-mono text-center md:text-left">© {new Date().getFullYear()} Vasanth Kumar C — AI Engineer</div>
        {/* Funny comment: Yes, this footer has been refactored more times than my sleeping schedule. */}
        <div className="font-mono tracking-widest uppercase text-center md:text-right">// Powered by caffeine, pure determination & questionable life choices</div>
      </div>
    </footer>
  );
}

/* ---------------- PAGE ---------------- */

export default function Portfolio() {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<typeof SKILL_CATEGORIES[number] | null>(null);
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[number] | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<typeof PROJECTS[number] | null>(null);

  const [isSkillDrawerOpen, setIsSkillDrawerOpen] = useState(false);
  const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false);
  const [isAchievementDrawerOpen, setIsAchievementDrawerOpen] = useState(false);
  
  const [isDegreeDrawerOpen, setIsDegreeDrawerOpen] = useState(false);
  const [isCertsDrawerOpen, setIsCertsDrawerOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background transition-colors duration-300">
      <Toaster theme="dark" />
      <Nav />
      <Hero />
      <WhatIOffer />
      <Experience />
      <Projects
        onProjectClick={(p) => {
          setSelectedProject(p);
          setIsProjectDrawerOpen(true);
        }}
        onAchievementClick={(a) => {
          setSelectedAchievement(a);
          setIsAchievementDrawerOpen(true);
        }}
      />
      <Skills
        onSkillClick={(cat, name) => {
          setSelectedSkillCategory(cat);
          setSelectedSkillName(name);
          setIsSkillDrawerOpen(true);
        }}
      />
      <Education
        onDegreeClick={() => setIsDegreeDrawerOpen(true)}
        onCertsClick={() => setIsCertsDrawerOpen(true)}
      />
      <Contact />
      <Footer />

      {/* Degree Details Drawer */}
      <RightDrawer
        isOpen={isDegreeDrawerOpen}
        onClose={() => setIsDegreeDrawerOpen(false)}
        title="Degree Details"
      >
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-video bg-black/40">
            <img
              src={DEGREE_INFO.photo}
              alt={DEGREE_INFO.college}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs font-semibold text-primary">
                {DEGREE_INFO.years}
              </span>
            </div>
          </div>

          <div className="border-b border-border/40 pb-4">
            <h3 className="text-lg font-bold text-foreground">{DEGREE_INFO.college}</h3>
            <p className="text-sm text-primary font-medium mt-1">{DEGREE_INFO.degree}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{DEGREE_INFO.minor}</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
              CGPA · {DEGREE_INFO.cgpa}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">What I Learnt</h4>
            <ul className="space-y-2.5">
              {DEGREE_INFO.learnt.map((item, index) => (
                <li key={index} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RightDrawer>

      {/* Certifications Details Drawer */}
      <RightDrawer
        isOpen={isCertsDrawerOpen}
        onClose={() => setIsCertsDrawerOpen(false)}
        title="Certifications"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            A list of completed professional courses and standard exams.
          </p>
          {CERTS.map((c) => (
            <div
              key={c.name}
              className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-primary/20 transition-all space-y-2"
            >
              <h4 className="font-semibold text-foreground text-sm">{c.name}</h4>
              <p className="text-xs text-primary font-medium">{c.issuedBy}</p>
              <div className="pt-2 flex items-center justify-between border-t border-white/5 mt-2">
                <span className="font-mono text-[10px] text-muted-foreground">ID: {c.id}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(c.id);
                    toast.success("Certificate ID copied!");
                  }}
                  className="text-[10px] text-primary hover:underline cursor-pointer"
                >
                  Copy ID
                </button>
              </div>
            </div>
          ))}
        </div>
      </RightDrawer>


      {/* Skills Fluency Drawer */}
      <RightDrawer
        isOpen={isSkillDrawerOpen}
        onClose={() => setIsSkillDrawerOpen(false)}
        title={selectedSkillCategory?.label || "Skill Details"}
      >
        {selectedSkillCategory && selectedSkillName && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-6">
              Fluency reflects my depth of knowledge, practical experience, and production readiness with this skill.
            </p>
            {selectedSkillCategory.skills.map((sk) => {
              const isSelected = sk.name === selectedSkillName;
              return (
                <motion.div
                  key={sk.name}
                  initial={isSelected ? { scale: 1.02 } : { scale: 1 }}
                  animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected
                      ? "border-primary/50 bg-primary/5 shadow-[0_0_15px_oklch(0.85_0.18_195/0.2)]"
                      : "border-white/5 bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          className="text-primary font-bold text-sm"
                        >
                          ➜
                        </motion.span>
                      )}
                      <span className={`font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {sk.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{sk.fluency}% fluency</span>
                  </div>

                  {/* Fluency Progress Bar */}
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sk.fluency}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        isSelected
                          ? "bg-gradient-to-r from-primary to-pink-500 shadow-[0_0_8px_oklch(0.85_0.18_195/0.8)]"
                          : "bg-muted-foreground/40"
                      }`}
                    />
                  </div>
                  {sk.details && <p className="text-xs text-muted-foreground/85 leading-relaxed">{sk.details}</p>}
                </motion.div>
              );
            })}
          </div>
        )}
      </RightDrawer>

      {/* Projects Details Drawer */}
      <RightDrawer
        isOpen={isProjectDrawerOpen}
        onClose={() => setIsProjectDrawerOpen(false)}
        title={selectedProject?.name || "Project Details"}
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{selectedProject.tag}</span>
              <p className="mt-2 text-sm text-muted-foreground">{selectedProject.blurb}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.details}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">Key Highlights</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {selectedProject.highlights.map((h, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.stack.map((s) => (
                  <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/40">
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" /> Visit Site
                </a>
              )}
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-white/10 transition cursor-pointer"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
            </div>
          </div>
        )}
      </RightDrawer>

      {/* Achievements Details Drawer */}
      <RightDrawer
        isOpen={isAchievementDrawerOpen}
        onClose={() => setIsAchievementDrawerOpen(false)}
        title={selectedAchievement?.name || "Achievement Details"}
      >
        {selectedAchievement && (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video bg-black/40">
              <img
                src={selectedAchievement.image}
                alt={selectedAchievement.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
                  {selectedAchievement.tag}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-border/40 pb-4">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Prize Details</span>
                <span className="text-sm font-semibold text-foreground">{selectedAchievement.prize}</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Date</span>
                <span className="text-sm font-semibold text-foreground">{selectedAchievement.date}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Location / Platform</span>
                <span className="text-sm font-semibold text-foreground">{selectedAchievement.place}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">Project Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedAchievement.details}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">Key Highlights</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {selectedAchievement.highlights.map((h, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </RightDrawer>
    </div>
  );
}

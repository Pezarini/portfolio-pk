/**
 * Single source of truth for all site copy & data.
 * Components are presentation-only and map over this — keeps editing
 * trivial and makes future i18n a drop-in (wrap in a locale map later).
 */

export const site = {
  name: "Pedro Kelvin",
  initials: "PK",
  role: "Engenheiro de Software, Especialista em IA e Construtor de Produtos.",
  tagline: "Transformo IA em produtos, operações e negócios escaláveis.",
  cvHref: "/cv/pedro-kelvin-cv.pdf",
  location: "Campinas, SP — Brasil",
  email: "pedrokelvin08601@gmail.com",
  linkedin: { label: "linkedin.com/in/pedro-kelvin", href: "https://linkedin.com/in/pedro-kelvin/" },
  github: { label: "github.com/Pezarini", href: "https://github.com/Pezarini" },
} as const;

export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Produtos & Cases", href: "#produtos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Formação", href: "#formacao" },
  { label: "Expertise", href: "#expertise" },
  { label: "Contato", href: "#contato" },
] as const;

export type AuthorityStat = {
  /** numeric portion for count-up; null = text only */
  value: number | null;
  prefix?: string;
  suffix?: string;
  title: string;
  desc: string;
  icon: "calendar" | "cube" | "building" | "brain";
};

export const authorityStats: AuthorityStat[] = [
  { value: 4, prefix: "+", suffix: " anos", title: "Experiência", desc: "profissional", icon: "calendar" },
  { value: 3, prefix: "+", suffix: " produtos IA", title: "Construídos", desc: "do zero", icon: "cube" },
  { value: null, title: "IBM + Sensetek", desc: "Experiência Enterprise", icon: "building" },
  { value: null, title: "LLM Specialist", desc: "OpenAI & AI Agents", icon: "brain" },
];

export const about = {
  eyebrow: "Sobre mim",
  title: "Técnico de produto, não só executor.",
  paragraphs: [
    "Sou Full Stack Developer com foco em backend, IA e sistemas escaláveis. Trabalho desde a modelagem de APIs e arquitetura até a construção de agentes de IA, integrações com LLMs e produtos digitais completos.",
    "Tenho base sólida em Node.js, TypeScript, React e arquitetura limpa — mas o que me move é transformar tecnologia em resultado: enxergar o problema de negócio, desenhar a solução e construí-la de ponta a ponta.",
    "Já entreguei sistemas enterprise na IBM e na Sensetek, e hoje construo meus próprios produtos de IA. Perfil técnico, visão de produto e mentalidade de quem constrói para escalar.",
  ],
  highlights: [
    "Backend & APIs escaláveis",
    "AI Agents & LLM Integrations",
    "Arquitetura limpa (SOLID / DDD / TDD)",
    "Visão de produto & negócio",
  ],
} as const;

export type JourneyItem = {
  year: string;
  org: string;
  title: string;
  desc: string;
};

export const journey: JourneyItem[] = [
  { year: "2021", org: "IBM", title: "Aprendiz de Desenvolvimento", desc: "Início da jornada em tecnologia: lógica de programação, Git, metodologias ágeis e primeiros sistemas." },
  { year: "2023", org: "IBM", title: "Full Stack Developer", desc: "Desenvolvimento de APIs escaláveis, sistemas enterprise e aplicações distribuídas." },
  { year: "2024", org: "Mobiis", title: "Junior Software Developer", desc: "Refatoração de plataforma React + TypeScript, com foco em arquitetura e performance." },
  { year: "2025", org: "Sensetek", title: "Full Stack Developer · foco em IA", desc: "Construção de agentes de IA, integrações com LLMs e plataformas inteligentes corporativas." },
  { year: "2025", org: "Entrevistai", title: "Produto próprio · em desenvolvimento", desc: "Plataforma de treino para entrevistas com IA, voz e feedback personalizado." },
  { year: "2025", org: "Certificai", title: "Produto próprio · em desenvolvimento", desc: "Simulados inteligentes para certificações financeiras com diagnóstico por IA." },
];

export type Product = {
  name: string;
  category: string;
  description: string;
  tags: string[];
  /** local screenshot path; component falls back to a mock if absent */
  image?: string;
  localUrl?: string;
  accent?: boolean;
};

export const products: Product[] = [
  {
    name: "Entrevistai",
    category: "Startup • IA",
    description:
      "Plataforma de treinamento para entrevistas com IA, simulando conversas reais e oferecendo feedback personalizado para candidatos.",
    tags: ["OpenAI", "Voice AI", "Feedback Engine", "Interview Training"],
    image: "/projects/entrevistai.png",
    localUrl: "http://localhost:3000",
  },
  {
    name: "Certificai",
    category: "EdTech • IA",
    description:
      "Simulados inteligentes para certificações financeiras como CPA-10 e CPA-20, com diagnóstico por IA para medir o nível de preparação do usuário.",
    tags: ["CPA-10", "CPA-20", "AI Assessment", "EdTech"],
    image: "/projects/certificai.png",
    localUrl: "http://localhost:8080",
  },
  {
    name: "Sensetek AI Agent",
    category: "Enterprise AI",
    description:
      "Agente corporativo de IA capaz de analisar bases de dados, entender contexto e regras de negócio da empresa, e responder perguntas em linguagem natural.",
    tags: ["LLM", "Tool Calling", "RAG", "Enterprise Data", "Business Rules"],
    image: "/projects/sensetek.png",
    accent: true,
  },
];

export type Experience = {
  company: string;
  role: string;
  description: string;
  tech: string[];
};

export const experiences: Experience[] = [
  {
    company: "IBM",
    role: "Full Stack Developer",
    description:
      "Desenvolvimento de aplicações enterprise, APIs escaláveis, sistemas distribuídos e integrações internas usadas por milhares de usuários.",
    tech: ["Node.js", "TypeScript", "MongoDB", "Vue.js", "Jest", "APIs REST"],
  },
  {
    company: "Mobiis",
    role: "Junior Software Developer",
    description:
      "Refatoração de plataforma React + TypeScript, melhorando escalabilidade, manutenibilidade, performance e integração com APIs.",
    tech: ["React", "TypeScript", "TailwindCSS", "API REST", "JWT"],
  },
  {
    company: "Sensetek",
    role: "Full Stack Developer · IA",
    description:
      "Desenvolvimento de agentes de IA, integrações com LLMs, APIs, dados corporativos e ferramentas enterprise.",
    tech: ["Node.js", "TypeScript", "React", "OpenAI", "PostgreSQL", "Tool Calling"],
  },
];

export type Credential = {
  title: string;
  org: string;
  year: string;
  type: "Graduação" | "Curso" | "Certificação";
};

export const education: Credential[] = [
  { title: "Análise e Desenvolvimento de Sistemas", org: "UNIP", year: "2025", type: "Graduação" },
  { title: "Desenvolvimento Full Stack", org: "Fundação Bradesco", year: "2021", type: "Curso" },
  { title: "Test-Driven Development", org: "IBM XP Farm", year: "2023", type: "Certificação" },
];

export const udemyTopics = [
  "Backend",
  "Frontend",
  "Node.js & APIs",
  "React & Next.js",
  "IA & LLMs",
  "Clean Architecture",
  "Cloud & DevOps",
  "Design Patterns",
];

export type ExpertiseGroup = {
  title: string;
  icon: "ai" | "backend" | "frontend" | "architecture" | "cloud" | "testing";
  items: string[];
};

export const expertise: ExpertiseGroup[] = [
  { title: "IA & Agents", icon: "ai", items: ["AI Agents", "OpenAI / GPT", "LLM Integrations", "Tool Calling", "RAG", "Prompt Engineering"] },
  { title: "Backend", icon: "backend", items: ["Node.js", "NestJS", "Express.js", "TypeScript", "REST APIs"] },
  { title: "Frontend", icon: "frontend", items: ["React.js", "Vue.js", "TypeScript", "TailwindCSS", "Next.js"] },
  { title: "Arquitetura & Boas práticas", icon: "architecture", items: ["Clean Architecture", "SOLID", "DDD", "TDD", "Design Patterns"] },
  { title: "Cloud & DevOps", icon: "cloud", items: ["Docker", "Git", "CI/CD", "IBM Cloud", "AWS básico"] },
  { title: "Testes", icon: "testing", items: ["Jest", "Cypress", "Postman"] },
];

export const contact = {
  eyebrow: "Vamos construir algo incrível?",
  title: "Vamos conversar.",
  subtitle:
    "Estou aberto a novas oportunidades, parcerias e projetos desafiadores. Se você quer transformar IA em produto, vamos trocar uma ideia.",
} as const;

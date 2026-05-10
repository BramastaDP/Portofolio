'use client';

import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiReactquery,
  SiVuedotjs,
  SiHtml5,
  SiCss,
  SiStorybook,
  SiExpress,
  SiFastapi,
  SiGo,
  SiGraphql,
  SiFlutter,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiLinux,
  SiFigma,
  SiGithubactions,
  SiNginx,
  SiPostman,
  SiExpo,
  SiKotlin,
  SiJavascript,
  SiBootstrap,
  SiSocketdotio,
  SiVite,
  SiPhp,
  SiLaravel,
  SiWordpress,
  SiOpenjdk,
} from 'react-icons/si';
import { Cloud, Code2, Smartphone, Zap } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = React.ComponentType<any>;

interface IconEntry {
  icon: AnyIcon;
  color: string;
}

const iconMap: Record<string, IconEntry> = {
  // ── Core ──────────────────────────────────────────────────────────────────
  'typescript':              { icon: SiTypescript,     color: '#3178C6' },
  'react / next.js':         { icon: SiReact,          color: '#61DAFB' },
  'node.js':                 { icon: SiNodedotjs,      color: '#339933' },
  'python':                  { icon: SiPython,         color: '#3776AB' },
  'rest api design':         { icon: Code2,            color: '#F59E0B' },
  'ui/ux design':            { icon: SiFigma,          color: '#F24E1E' },

  // ── Frontend ──────────────────────────────────────────────────────────────
  'react':                   { icon: SiReact,          color: '#61DAFB' },
  'next.js':                 { icon: SiNextdotjs,      color: '#e5e5e5' },
  'tailwind css':            { icon: SiTailwindcss,    color: '#06B6D4' },
  'framer motion':           { icon: SiFramer,         color: '#e5e5e5' },
  'zustand / redux':         { icon: SiRedux,          color: '#764ABC' },
  'react query':             { icon: SiReactquery,     color: '#FF4154' },
  'vue.js':                  { icon: SiVuedotjs,       color: '#4FC08D' },
  'html / css':              { icon: SiHtml5,          color: '#E34F26' },
  'storybook':               { icon: SiStorybook,      color: '#FF4785' },
  'javascript':              { icon: SiJavascript,     color: '#F7DF1E' },
  'bootstrap':               { icon: SiBootstrap,      color: '#7952B3' },
  'vite':                    { icon: SiVite,           color: '#646CFF' },
  'css':                     { icon: SiCss,            color: '#1572B6' },
  'html5':                   { icon: SiHtml5,          color: '#E34F26' },
  'css3':                    { icon: SiCss,            color: '#1572B6' },

  // ── Backend ───────────────────────────────────────────────────────────────
  'php':                     { icon: SiPhp,            color: '#777BB4' },
  'laravel':                 { icon: SiLaravel,        color: '#FF2D20' },
  'java':                    { icon: SiOpenjdk,        color: '#ED8B00' },
  'express.js':              { icon: SiExpress,        color: '#e5e5e5' },
  'fastapi':                 { icon: SiFastapi,        color: '#009688' },
  'go (golang)':             { icon: SiGo,             color: '#00ACD7' },
  'graphql':                 { icon: SiGraphql,        color: '#E10098' },
  'websocket':               { icon: SiSocketdotio,    color: '#e5e5e5' },
  'grpc':                    { icon: Zap,              color: '#9ca3af' },

  // ── Mobile ────────────────────────────────────────────────────────────────
  'react native':            { icon: SiReact,          color: '#61DAFB' },
  'expo':                    { icon: SiExpo,           color: '#e5e5e5' },
  'flutter':                 { icon: SiFlutter,        color: '#02569B' },
  'pwa':                     { icon: Smartphone,       color: '#9ca3af' },
  'kotlin':                  { icon: SiKotlin,         color: '#7F52FF' },

  // ── Database ──────────────────────────────────────────────────────────────
  'sql':                     { icon: SiMysql,          color: '#4479A1' },
  'postgresql':              { icon: SiPostgresql,     color: '#4169E1' },
  'mysql':                   { icon: SiMysql,          color: '#4479A1' },
  'mongodb':                 { icon: SiMongodb,        color: '#47A248' },
  'redis':                   { icon: SiRedis,          color: '#DC382D' },
  'prisma orm':              { icon: SiPrisma,         color: '#818cf8' },
  'supabase':                { icon: SiSupabase,       color: '#3ECF8E' },
  'firebase':                { icon: SiFirebase,       color: '#FFCA28' },

  // ── Tools ─────────────────────────────────────────────────────────────────
  'git / github':            { icon: SiGithub,         color: '#e5e5e5' },
  'docker':                  { icon: SiDocker,         color: '#2496ED' },
  'aws (ec2, s3, lambda)':   { icon: Cloud,            color: '#FF9900' },
  'vercel':                  { icon: SiVercel,         color: '#e5e5e5' },
  'linux / bash':            { icon: SiLinux,          color: '#FCC624' },
  'figma':                   { icon: SiFigma,          color: '#F24E1E' },
  'ci/cd (github actions)':  { icon: SiGithubactions,  color: '#2088FF' },
  'nginx':                   { icon: SiNginx,          color: '#009639' },
  'postman':                 { icon: SiPostman,        color: '#FF6C37' },
  'git':                     { icon: SiGit,            color: '#F05032' },
  'github':                  { icon: SiGithub,         color: '#e5e5e5' },
  'wordpress':               { icon: SiWordpress,      color: '#21759B' },
  'vs code':                 { icon: Code2,             color: '#007ACC' },
};

export function SkillIcon({ name, size = 14 }: { name: string; size?: number }) {
  const entry = iconMap[name.toLowerCase()];
  if (!entry || !entry.icon) {
    return <Code2 size={size} className="text-neutral-500" />;
  }
  const Icon = entry.icon;
  return (
    <span style={{ color: entry.color, display: 'inline-flex', alignItems: 'center' }}>
      <Icon size={size} />
    </span>
  );
}

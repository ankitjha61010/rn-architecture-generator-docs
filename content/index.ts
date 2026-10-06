import type { ComponentType } from 'react';
import { Architectures, Microservices, Monolith } from './architecture';
import { Installation, Introduction, QuickStart } from './gettingStarted';
import { Authentication, Configuration, Database, Docker, Notifications, Ota, Payments, Realtime, Swagger } from './guides';
import { Changelog, CliReference, Contributing, Examples, Troubleshooting } from './reference';
import { AdminPanel, Backend, Branding, ReactNativeApp } from './templates';

/** Page body per slug – titles, descriptions and order live in lib/site.ts. */
export const content: Record<string, ComponentType> = {
  introduction: Introduction,
  installation: Installation,
  'quick-start': QuickStart,
  'react-native-app': ReactNativeApp,
  branding: Branding,
  backend: Backend,
  'admin-panel': AdminPanel,
  architectures: Architectures,
  monolith: Monolith,
  microservices: Microservices,
  authentication: Authentication,
  database: Database,
  payments: Payments,
  realtime: Realtime,
  notifications: Notifications,
  swagger: Swagger,
  docker: Docker,
  ota: Ota,
  configuration: Configuration,
  'cli-reference': CliReference,
  troubleshooting: Troubleshooting,
  changelog: Changelog,
  examples: Examples,
  contributing: Contributing,
};

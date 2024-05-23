import { type ApiRoutes } from '@server/app'; // GETTING THIS FROM BACKEND FOR MODRE DEFINED ROUTES
import { hc } from 'hono/client';

const client = hc<ApiRoutes>('/');

export const api = client.api;

import type { CreateNodesV2, CreateNodesResult } from '@nx/devkit';
import { dirname } from 'path';
import { GO_MOD_FILE } from '../constants';

export const createNodes: CreateNodesV2 = [
  `**/${GO_MOD_FILE}`,
  (files) => files.map(file => {
    const root = dirname(file);
    const parts = root.split(/[/\\]/g);
    const name = parts[parts.length - 1].toLowerCase();

    // We cannot create nodes if go.mod is in the workspace root folder
    // in this case we let Nx use project.json files (by default)
    if (root === '.') {
      return [file, {}];
    }

    return [file, {
      projects: {
        [name]: {
          name,
          root,
          // TODO provide default targets for non-project.json workspaces
          targets: {},
        },
      },
    }] as [string, CreateNodesResult];
  }),
];

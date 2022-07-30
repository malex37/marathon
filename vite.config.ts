import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import rollupPolyfillNode from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true
  },
  resolve: {
    // alias: {
    //   // // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill, 
    //   // // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
    //   util: 'rollup-plugin-node-polyfills/polyfills/util',
    //   events: 'rollup-plugin-node-polyfills/polyfills/events',
    //   stream: 'rollup-plugin-node-polyfills/polyfills/stream',
    //   path: 'rollup-plugin-node-polyfills/polyfills/path',
    //   querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
    //   url: 'rollup-plugin-node-polyfills/polyfills/url',
    //   string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
    //   http: 'rollup-plugin-node-polyfills/polyfills/http',
    //   buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    //   process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    //   // Not included in `rollup-plugin-node-polyfills`.
    //   // os: 'rollup-plugin-node-polyfills/polyfills/os',
    //   os: 'rollup-plugin-node-polyfills/polyfills/os',
    //   // os: 'rollup-plugin-polyfill-node',
    //   // sys: 'util',
    //   // punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
    //   // https: 'rollup-plugin-node-polyfills/polyfills/http',
    //   // assert: 'rollup-plugin-node-polyfills/polyfills/assert',
    //   // constants: 'rollup-plugin-node-polyfills/polyfills/constants',
    //   // _stream_duplex:
    //   //           'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
    //   // _stream_passthrough:
    //   //           'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
    //   // _stream_readable:
    //   //           'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
    //   // _stream_writable:
    //   //           'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
    //   // _stream_transform:
    //   //           'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
    //   // timers: 'rollup-plugin-node-polyfills/polyfills/timers',
    //   // console: 'rollup-plugin-node-polyfills/polyfills/console',
    //   // vm: 'rollup-plugin-node-polyfills/polyfills/vm',
    //   // zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
    //   // tty: 'rollup-plugin-node-polyfills/polyfills/tty',
    //   // domain: 'rollup-plugin-node-polyfills/polyfills/domain',
    // },
    alias: {
      util: 'rollup-plugin-polyfill-node',
      events: 'rollup-plugin-polyfill-node',
      stream: 'rollup-plugin-polyfill-node',
      // path: 'rollup-plugin-polyfill-node', // 'extname' is not exported by `path`
      path: 'rollup-plugin-node-polyfills/polyfills/path', // 'posix' is not exported by
      querystring: 'rollup-plugin-polyfill-node',
      url: 'rollup-plugin-polyfill-node',
      string_decoder: 'rollup-plugin-polyfill-node',
      http: 'rollup-plugin-polyfill-node',
      buffer: 'rollup-plugin-polyfill-node',
      process: 'rollup-plugin-polyfill-node',
      os: 'rollup-plugin-polyfill-node'
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
        rollupPolyfillNode(),
      ]
    }
  }
});
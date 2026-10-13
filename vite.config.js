import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eventsHandler from './api/events.js';
import trainsHandler from './api/trains.js';
import routeHandler from './api/route.js';

function queryFrom(req){
  const url=new URL(req.url||'', 'http://localhost');
  return Object.fromEntries(url.searchParams.entries());
}
function bridge(handler){
  return async (req,res)=>{
    const body=[];
    const out={
      statusCode:200,
      headers:{},
      status(code){this.statusCode=code;return this;},
      setHeader(k,v){this.headers[k]=v;},
      json(payload){
        res.statusCode=this.statusCode;
        res.setHeader('Content-Type','application/json; charset=utf-8');
        Object.entries(this.headers).forEach(([k,v])=>res.setHeader(k,v));
        res.end(JSON.stringify(payload));
      },
      end(payload=''){res.statusCode=this.statusCode;res.end(payload);}
    };
    req.query=queryFrom(req);
    try{await handler(req,out);}catch(error){res.statusCode=500;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({error:'Server error'}));}
  };
}

function apiDevMiddleware(){
  return {
    name:'tripsphere-live-services',
    configureServer(server){
      server.middlewares.use('/api/events',bridge(eventsHandler));
      server.middlewares.use('/api/trains',bridge(trainsHandler));
      server.middlewares.use('/api/route',bridge(routeHandler));
    }
  };
}

export default defineConfig({
  plugins:[react(),apiDevMiddleware()],
  resolve:{alias:{'@':path.resolve(__dirname,'./src')}}
});

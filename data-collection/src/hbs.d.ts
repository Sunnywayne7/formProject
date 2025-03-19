declare module 'hbs' {
    import { TemplateDelegate } from 'handlebars';
  
    function registerHelper(name: string, fn: (...args: any[]) => any): void;
    function SafeString(str: string): any; // Fix TypeScript issue
  
    export { registerHelper, SafeString };
    export default function hbs(): any;
  }
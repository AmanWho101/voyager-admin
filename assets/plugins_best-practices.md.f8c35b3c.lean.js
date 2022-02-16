import{_ as s,c as n,o,b as e,d as t}from"./app.603d55eb.js";const v=`{"title":"Best practices","description":"","frontmatter":{},"headers":[{"level":2,"title":"Don't load things in the constructor","slug":"don-t-load-things-in-the-constructor"}],"relativePath":"plugins/best-practices.md"}`,a={},i=e("h1",{id:"best-practices",tabindex:"-1"},[t("Best practices "),e("a",{class:"header-anchor",href:"#best-practices","aria-hidden":"true"},"#")],-1),r=e("p",null,"This page shows some of the best practices regarding plugin development.",-1),c=e("h2",{id:"don-t-load-things-in-the-constructor",tabindex:"-1"},[t("Don't load things in the constructor "),e("a",{class:"header-anchor",href:"#don-t-load-things-in-the-constructor","aria-hidden":"true"},"#")],-1),d=e("p",null,[t("Your plugin class is loaded when calling "),e("code",null,"addPlugin(...)"),t(" even when it's disabled. To prevent long loading times and unnecessary memory usage, load data only when needed (in route definitions, for example).")],-1),l=[i,r,c,d];function h(p,u,_,g,f,m){return o(),n("div",null,l)}var x=s(a,[["render",h]]);export{v as __pageData,x as default};

import{_ as e,c as t,o as a,a as o}from"./app.44eaed71.js";var r="/voyager/bread-builder/scope-select.png",s="/voyager/bread-builder/computed-list.png",i="/voyager/bread-builder/computed-view.png";const b='{"title":"Manipulate data","description":"","frontmatter":{},"headers":[{"level":2,"title":"Filters","slug":"filters"},{"level":2,"title":"Scopes","slug":"scopes"},{"level":2,"title":"Computed properties","slug":"computed-properties"},{"level":3,"title":"Getting data","slug":"getting-data"},{"level":3,"title":"Setting data","slug":"setting-data"},{"level":3,"title":"Using your computed property","slug":"using-your-computed-property"}],"relativePath":"bread/manipulate-data.md","lastUpdated":1639658084785}',n={},d=o('<h1 id="manipulate-data" tabindex="-1">Manipulate data <a class="header-anchor" href="#manipulate-data" aria-hidden="true">#</a></h1><p>This page shows you various ways to manipulate the data shown in your BREADs.</p><h2 id="filters" tabindex="-1">Filters <a class="header-anchor" href="#filters" aria-hidden="true">#</a></h2><p>Read more about filters <a href="./../plugins/#filter">here</a></p><h2 id="scopes" tabindex="-1">Scopes <a class="header-anchor" href="#scopes" aria-hidden="true">#</a></h2><p>You can apply a scope to every layout in a BREAD.<br> The <a href="https://laravel.com/docs/eloquent#local-scopes" target="_blank" rel="noopener noreferrer">Laravel documentation</a> shows you how to implement them.</p><p>For Voyager to recognize your scope, please make sure to follow the naming convention <code>scope[X]</code>, for example <code>scopeActive</code>.<br> You can now select the scope you want to use in the layout options:</p><p><img src="'+r+'" alt="Selecting the scope for a layout"></p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Because Voyager doesn&#39;t know which <a href="./views.html">view</a> you use in combination with which <a href="./lists.html">list</a>, you <strong>should</strong> also apply the scope to your views to prevent users from manually setting URL parameters and using entries they are not supposed to.</p></div><h2 id="computed-properties" tabindex="-1">Computed properties <a class="header-anchor" href="#computed-properties" aria-hidden="true">#</a></h2><p>Computed properties allow you to display and edit properties that don&#39;t physically exist in your database.</p><h3 id="getting-data" tabindex="-1">Getting data <a class="header-anchor" href="#getting-data" aria-hidden="true">#</a></h3><p>To get the data to be shown when browsing, simply create an <a href="https://laravel.com/docs/eloquent-mutators#defining-an-accessor" target="_blank" rel="noopener noreferrer">accessor</a> as described in the Laravel docs.<br> Please be aware that an accessor has to be named <code>get[X]Attribute</code> (for example <code>getFullNameAttribute</code>) to be recognized by Voyager.</p><h3 id="setting-data" tabindex="-1">Setting data <a class="header-anchor" href="#setting-data" aria-hidden="true">#</a></h3><p>If you want to be able to edit and/or add the data of a non-existing property, you <strong>have</strong> to create a <a href="https://laravel.com/docs/eloquent-mutators#defining-a-mutator" target="_blank" rel="noopener noreferrer">mutator</a>.<br> When used in a list, an accessor is suficient.<br> The mutator also has to follow the naming convention <code>set[X]Attribute</code>, for example <code>setFullNameAttribute</code>.</p><h3 id="using-your-computed-property" tabindex="-1">Using your computed property <a class="header-anchor" href="#using-your-computed-property" aria-hidden="true">#</a></h3><p>Now that you created an accessor (and a mutator when you want to edit/add), you can simply select your accessor in the <code>Column</code> dropdown.</p><p><img src="'+s+'" alt="Selecting a computed property in a list"></p><p><img src="'+i+'" alt="Selecting a computed property in a view"></p>',19),p=[d];function l(c,u,h,m,g,y){return a(),t("div",null,p)}var _=e(n,[["render",l]]);export{b as __pageData,_ as default};

import{_ as n,c as s,o as a,a as t}from"./app.442c60b5.js";const y='{"title":"Filters","description":"","frontmatter":{},"headers":[{"level":2,"title":"Layouts","slug":"layouts"},{"level":2,"title":"MenuItems","slug":"menuitems"},{"level":2,"title":"Widgets","slug":"widgets"},{"level":2,"title":"Media","slug":"media"}],"relativePath":"plugins/filter.md","lastUpdated":1639657410598}',p={},e=t(`<h1 id="filters" tabindex="-1">Filters <a class="header-anchor" href="#filters" aria-hidden="true">#</a></h1><p>Filters allow you to manipulate and filter various things used in Voyager.</p><h2 id="layouts" tabindex="-1">Layouts <a class="header-anchor" href="#layouts" aria-hidden="true">#</a></h2><p>Filter the available layouts for a given BREAD.</p><div class="language-php"><pre><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\\</span>Support<span class="token punctuation">\\</span>Collection</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>Bread</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Contracts<span class="token punctuation">\\</span>Plugins<span class="token punctuation">\\</span>GenericPlugin</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Contracts<span class="token punctuation">\\</span>Plugins<span class="token punctuation">\\</span>Features<span class="token punctuation">\\</span>Filter<span class="token punctuation">\\</span>Layouts</span> <span class="token keyword">as</span> LayoutFilter<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">MyPlugin</span> <span class="token keyword">implements</span> <span class="token class-name">GenericPlugin</span><span class="token punctuation">,</span> LayoutFilter
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">filterLayouts</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Bread</span> <span class="token variable">$bread</span><span class="token punctuation">,</span> <span class="token keyword type-hint">string</span> <span class="token variable">$action</span><span class="token punctuation">,</span> <span class="token class-name type-declaration">Collection</span> <span class="token variable">$layouts</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token class-name return-type">Collection</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// $bread contains the BREAD class</span>
        <span class="token comment">// $action can be either &quot;browse&quot;, &quot;read&quot;, &quot;edit&quot; or &quot;add&quot;</span>

        <span class="token keyword">return</span> <span class="token variable">$layouts</span><span class="token operator">-&gt;</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$layout</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Add your conditions here</span>
            <span class="token keyword">return</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div><h2 id="menuitems" tabindex="-1">MenuItems <a class="header-anchor" href="#menuitems" aria-hidden="true">#</a></h2><p>Filter the shown menu-items.</p><div class="language-php"><pre><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\\</span>Support<span class="token punctuation">\\</span>Collection</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Contracts<span class="token punctuation">\\</span>Plugins<span class="token punctuation">\\</span>GenericPlugin</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Contracts<span class="token punctuation">\\</span>Plugins<span class="token punctuation">\\</span>Features<span class="token punctuation">\\</span>Filter<span class="token punctuation">\\</span>MenuItems</span> <span class="token keyword">as</span> MenuItemFilter<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">MyPlugin</span> <span class="token keyword">implements</span> <span class="token class-name">GenericPlugin</span><span class="token punctuation">,</span> MenuItemFilter
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">filterMenuItems</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Collection</span> <span class="token variable">$items</span><span class="token punctuation">,</span> <span class="token variable">$mainMenu</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token class-name return-type">Collection</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// $mainMenu is true when items for the main-menu are passed, when false for the user-menu</span>
        <span class="token keyword">return</span> <span class="token variable">$items</span><span class="token operator">-&gt;</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Add your conditions here</span>
            <span class="token keyword">return</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div><h2 id="widgets" tabindex="-1">Widgets <a class="header-anchor" href="#widgets" aria-hidden="true">#</a></h2><p>Filter the widgets shown on the dashboard</p><div class="language-php"><pre><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\\</span>Support<span class="token punctuation">\\</span>Collection</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Contracts<span class="token punctuation">\\</span>Plugins<span class="token punctuation">\\</span>GenericPlugin</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Contracts<span class="token punctuation">\\</span>Plugins<span class="token punctuation">\\</span>Features<span class="token punctuation">\\</span>Filter<span class="token punctuation">\\</span>Widgets</span> <span class="token keyword">as</span> WidgetFilter<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">MyPlugin</span> <span class="token keyword">implements</span> <span class="token class-name">GenericPlugin</span><span class="token punctuation">,</span> WidgetFilter
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">filterWidgets</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Collection</span> <span class="token variable">$widgets</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token class-name return-type">Collection</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$widgets</span><span class="token operator">-&gt;</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$widget</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Add your conditions here</span>
            <span class="token keyword">return</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div><h2 id="media" tabindex="-1">Media <a class="header-anchor" href="#media" aria-hidden="true">#</a></h2><p>Filter the shown files/directories in the media-manager</p><div class="language-php"><pre><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\\</span>Support<span class="token punctuation">\\</span>Collection</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Contracts<span class="token punctuation">\\</span>Plugins<span class="token punctuation">\\</span>GenericPlugin</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Contracts<span class="token punctuation">\\</span>Plugins<span class="token punctuation">\\</span>Features<span class="token punctuation">\\</span>Filter<span class="token punctuation">\\</span>Media</span> <span class="token keyword">as</span> MediaFilter<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">MyPlugin</span> <span class="token keyword">implements</span> <span class="token class-name">GenericPlugin</span><span class="token punctuation">,</span> MediaFilter
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">filterMedia</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Collection</span> <span class="token variable">$files</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token class-name return-type">Collection</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$files</span><span class="token operator">-&gt;</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$file</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Add your conditions here</span>
            <span class="token keyword">return</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div>`,14),o=[e];function c(l,u,i,k,r,d){return a(),s("div",null,o)}var g=n(p,[["render",c]]);export{y as __pageData,g as default};

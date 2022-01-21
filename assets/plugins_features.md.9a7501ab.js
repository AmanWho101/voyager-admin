import{_ as n,c as s,o as a,a as t}from"./app.cc1fb9e4.js";const f='{"title":"Features","description":"","frontmatter":{},"headers":[],"relativePath":"plugins/features.md","lastUpdated":1642770432664}',e={},p=t(`<h1 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-hidden="true">#</a></h1><div class="language-php"><pre><code><span class="token keyword">namespace</span> <span class="token package">My<span class="token punctuation">\\</span>Formfield</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>Formfield</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">MyFormfield</span> <span class="token keyword">extends</span> <span class="token class-name">Formfield</span>
<span class="token punctuation">{</span>
    <span class="token comment">// The name of your formfield in a readable form. Can be a translation object</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string single-quoted-string">&#39;My Formfield&#39;</span><span class="token punctuation">;</span>
        <span class="token comment">// Or</span>
        <span class="token keyword">return</span> <span class="token function">__</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;mynamespace::name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// The name in a slugged form, used for identification. Can not be translated!</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string single-quoted-string">&#39;my-formfield&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// The name of the component</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getComponentName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string single-quoted-string">&#39;my-formfield&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// The name of the builder component</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getBuilderComponentName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string single-quoted-string">&#39;my-formfield-builder&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token variable">$notTranslatable</span><span class="token punctuation">;</span>        <span class="token comment">// Formfield can not be translated</span>
    <span class="token keyword">public</span> <span class="token variable">$notAsSetting</span><span class="token punctuation">;</span>           <span class="token comment">// Formfield can not be used as a setting</span>
    <span class="token keyword">public</span> <span class="token variable">$notInLists</span><span class="token punctuation">;</span>             <span class="token comment">// Can not be used in Lists</span>
    <span class="token keyword">public</span> <span class="token variable">$notInViews</span><span class="token punctuation">;</span>             <span class="token comment">// Can not be used in Views</span>
    <span class="token keyword">public</span> <span class="token variable">$browseArray</span><span class="token punctuation">;</span>            <span class="token comment">// Get the data as an array when browsing</span>
    <span class="token keyword">public</span> <span class="token variable">$noColumns</span><span class="token punctuation">;</span>              <span class="token comment">// Don&#39;t allow normal columns as the field</span>
    <span class="token keyword">public</span> <span class="token variable">$noComputedProps</span><span class="token punctuation">;</span>        <span class="token comment">// Don&#39;t allow accessors as the field</span>
    <span class="token keyword">public</span> <span class="token variable">$noRelationships</span><span class="token punctuation">;</span>        <span class="token comment">// Don&#39;t allow relationship objects as the field</span>
    <span class="token keyword">public</span> <span class="token variable">$noRelationshipProps</span><span class="token punctuation">;</span>    <span class="token comment">// Don&#39;t allow relationship columns as the field</span>
    <span class="token keyword">public</span> <span class="token variable">$noRelationshipPivots</span><span class="token punctuation">;</span>   <span class="token comment">// Don&#39;t allow relationship pivot columns as the field</span>
<span class="token punctuation">}</span>
</code></pre></div>`,2),o=[p];function c(l,i,u,k,r,d){return a(),s("div",null,o)}var y=n(e,[["render",c]]);export{f as __pageData,y as default};

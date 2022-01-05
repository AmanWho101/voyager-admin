import{_ as n,c as s,o as a,a as t}from"./app.5d92c05f.js";const g='{"title":"Components","description":"","frontmatter":{},"headers":[{"level":2,"title":"Settings","slug":"settings"}],"relativePath":"plugins/components.md","lastUpdated":1641378531247}',p={},o=t(`<h1 id="components" tabindex="-1">Components <a class="header-anchor" href="#components" aria-hidden="true">#</a></h1><p>To register a Vue component with Voyager, simply call <code>voyager.component(&#39;my-component&#39;, Component)</code>:</p><div class="language-javascript"><pre><code>
<span class="token keyword">import</span> Component <span class="token keyword">from</span> <span class="token string">&#39;./Component.vue&#39;</span><span class="token punctuation">;</span>
voyager<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;my-component&#39;</span><span class="token punctuation">,</span> Component<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Or</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

voyager<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;my-component&#39;</span><span class="token punctuation">,</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    methods<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="settings" tabindex="-1">Settings <a class="header-anchor" href="#settings" aria-hidden="true">#</a></h2><p>You can provide the name of a component that will be shown in a modal when clicking the <code>Settings</code> button on the plugins page.<br> To do so, include the <code>SettingsComponent</code> trait and return the name of your component in a function named <code>getSettingsComponent</code>:</p><div class="language-php"><pre><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Contracts<span class="token punctuation">\\</span>Plugins<span class="token punctuation">\\</span>Features<span class="token punctuation">\\</span>Provider<span class="token punctuation">\\</span>SettingsComponent</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">MyPlugin</span> <span class="token keyword">implements</span> <span class="token class-name">SettingsComponent</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getSettingsComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string single-quoted-string">&#39;my-component-name&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre></div>`,6),e=[o];function c(i,u,l,k,r,d){return a(),s("div",null,e)}var h=n(p,[["render",c]]);export{g as __pageData,h as default};

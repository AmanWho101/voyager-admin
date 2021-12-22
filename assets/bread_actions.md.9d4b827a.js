import{_ as n,c as a,o as s,a as e}from"./app.44eaed71.js";const h='{"title":"Actions","description":"","frontmatter":{},"headers":[{"level":2,"title":"Adding an Action","slug":"adding-an-action"},{"level":2,"title":"Method","slug":"method"},{"level":2,"title":"Bulk actions","slug":"bulk-actions"},{"level":2,"title":"Downloads","slug":"downloads"},{"level":2,"title":"Route","slug":"route"},{"level":2,"title":"URL","slug":"url"},{"level":2,"title":"Permission","slug":"permission"},{"level":2,"title":"Display on BREAD","slug":"display-on-bread"},{"level":2,"title":"Confirm","slug":"confirm"},{"level":2,"title":"Success","slug":"success"},{"level":2,"title":"Reload after your action is done","slug":"reload-after-your-action-is-done"},{"level":2,"title":"Deleted and non-deleted items","slug":"deleted-and-non-deleted-items"}],"relativePath":"bread/actions.md","lastUpdated":1640165093294}',t={},o=e(`<h1 id="actions" tabindex="-1">Actions <a class="header-anchor" href="#actions" aria-hidden="true">#</a></h1><p>Actions are the buttons you see when browsing a BREAD.<br> There are two kinds of actions: bulk and single.<br> By default all actions are single actions.</p><h2 id="adding-an-action" tabindex="-1">Adding an Action <a class="header-anchor" href="#adding-an-action" aria-hidden="true">#</a></h2><p>To add an action add the following to your service provider:</p><div class="language-php"><pre><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Classes<span class="token punctuation">\\</span>Action</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Voyager<span class="token punctuation">\\</span>Admin<span class="token punctuation">\\</span>Manager<span class="token punctuation">\\</span>Bread</span> <span class="token keyword">as</span> BreadManager<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">boot</span><span class="token punctuation">(</span><span class="token class-name type-declaration">BreadManager</span> <span class="token variable">$breadmanager</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token variable">$action</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Action</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;My title&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;my-icon&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;my_route&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$breadmanager</span><span class="token operator">-&gt;</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token variable">$action</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre></div><p>For convenience you can pass as many actions to <code>addAction()</code> as you want.<br> Color can be one of Tailwinds color palette (gray, red, green, blue, purple, ...) or <code>accent</code><br> The title can be a translation-key (for example <code>generic.action_title</code>) or a normal string.<br> When used as a bulk-action your translation can also contain pluralizable strings.</p><h2 id="method" tabindex="-1">Method <a class="header-anchor" href="#method" aria-hidden="true">#</a></h2><p>By default the HTTP method used when clicking your action is <code>get</code>.<br> You can set your method by calling <code>-&gt;method(&#39;post&#39;)</code> where the parameter is one of <code>get</code>, <code>post</code>, <code>put</code>, <code>patch</code> or <code>delete</code>.</p><h2 id="bulk-actions" tabindex="-1">Bulk actions <a class="header-anchor" href="#bulk-actions" aria-hidden="true">#</a></h2><p>To make your action a bulk-action, simply call <code>-&gt;bulk()</code></p><h2 id="downloads" tabindex="-1">Downloads <a class="header-anchor" href="#downloads" aria-hidden="true">#</a></h2><p>If you want to generate a file and send it to the user after clicking your action, simply call <code>-&gt;download(&#39;my_file.txt&#39;)</code> with the name of the file.<br> Make sure to return the file-contents as the response.</p><h2 id="route" tabindex="-1">Route <a class="header-anchor" href="#route" aria-hidden="true">#</a></h2><p>You can provide a route-name as string like <code>-&gt;route(&#39;my_route&#39;)</code> or a callback function which will receive the currently used BREAD:</p><div class="language-php"><pre><code><span class="token variable">$action</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Action</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;My title&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;my-icon&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">-&gt;</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$bread</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string single-quoted-string">&#39;voyager.&#39;</span><span class="token operator">.</span><span class="token variable">$bread</span><span class="token operator">-&gt;</span><span class="token property">slug</span><span class="token operator">.</span><span class="token string single-quoted-string">&#39;.edit&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="url" tabindex="-1">URL <a class="header-anchor" href="#url" aria-hidden="true">#</a></h2><p>Instead of a route name you can directly provide an URL like <code>-&gt;url(&#39;http://...&#39;)</code></p><h2 id="permission" tabindex="-1">Permission <a class="header-anchor" href="#permission" aria-hidden="true">#</a></h2><p>If you want your action to depend on a permission, use <code>-&gt;permission()</code>:</p><div class="language-php"><pre><code><span class="token variable">$action</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Action</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;My title&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;my-icon&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">-&gt;</span><span class="token function">permission</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;delete&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token comment">/* additional arguments */</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="display-on-bread" tabindex="-1">Display on BREAD <a class="header-anchor" href="#display-on-bread" aria-hidden="true">#</a></h2><p>You can provide a callback function to determine if your action should be displayed on the currently used BREAD.<br> To do so, simply chain the method <code>-&gt;displayOnBread(function ($bread) { ... })</code> to your action and return a boolean value.</p><div class="language-php"><pre><code><span class="token variable">$action</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Action</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;My title&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;my-icon&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">-&gt;</span><span class="token function">displayOnBread</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$bread</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$myCondition</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// Display this action</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token constant boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// Don&#39;t display this action</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="confirm" tabindex="-1">Confirm <a class="header-anchor" href="#confirm" aria-hidden="true">#</a></h2><p>Sometimes you want the user to confirm the action.<br> To do so, simply use <code>-&gt;confirm(...)</code>:</p><div class="language-php"><pre><code><span class="token variable">$action</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Action</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;My title&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;my-icon&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">-&gt;</span><span class="token function">confirm</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;Are you sure you want to do this?&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;Are you sure&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;red&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The first parameter is the message, the second the title (can be null), the third again is a color from the Tailwind color-palette (or <code>accent</code>)<br> Like for the action title you can provide your title and message as translation-keys.</p><h2 id="success" tabindex="-1">Success <a class="header-anchor" href="#success" aria-hidden="true">#</a></h2><p>You can display a success notification after your action was completed.</p><div class="language-php"><pre><code><span class="token variable">$action</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Action</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;My title&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;my-icon&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;color&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">-&gt;</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;The action finished successfully.&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;Done&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;green&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The parameter are the same as for <code>confirm()</code>.</p><h2 id="reload-after-your-action-is-done" tabindex="-1">Reload after your action is done <a class="header-anchor" href="#reload-after-your-action-is-done" aria-hidden="true">#</a></h2><p>If you want to reload the browse-results after your action was run, simply use <code>-&gt;reloadAfter()</code></p><h2 id="deleted-and-non-deleted-items" tabindex="-1">Deleted and non-deleted items <a class="header-anchor" href="#deleted-and-non-deleted-items" aria-hidden="true">#</a></h2><p>When using soft-deletes it is useful to only display the action on soft-deleted or not soft-deleted entries.<br> This can be done by calling either <code>-&gt;displayDeletable()</code> or <code>displayRestorable()</code> respectively.</p>`,35),p=[o];function c(i,l,r,u,d,k){return s(),a("div",null,p)}var y=n(t,[["render",c]]);export{h as __pageData,y as default};
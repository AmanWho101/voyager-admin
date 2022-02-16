import{_ as e,c as t,o as a,a as n}from"./app.603d55eb.js";const f='{"title":"Settings","description":"","frontmatter":{},"headers":[{"level":2,"title":"Add a setting","slug":"add-a-setting"},{"level":2,"title":"Remove a setting","slug":"remove-a-setting"},{"level":2,"title":"Duplicate a setting","slug":"duplicate-a-setting"},{"level":2,"title":"Generate the key for a setting","slug":"generate-the-key-for-a-setting"},{"level":2,"title":"Move a setting","slug":"move-a-setting"},{"level":2,"title":"Change the group of a setting","slug":"change-the-group-of-a-setting"},{"level":2,"title":"Getting settings from code","slug":"getting-settings-from-code"},{"level":3,"title":"Default value","slug":"default-value"},{"level":3,"title":"Translate","slug":"translate"},{"level":2,"title":"Writing settings from code","slug":"writing-settings-from-code"},{"level":2,"title":"Batch update","slug":"batch-update"}],"relativePath":"settings.md"}',i={},s=n('<h1 id="settings" tabindex="-1">Settings <a class="header-anchor" href="#settings" aria-hidden="true">#</a></h1><p>Settings are stored on your disk and can be version-controlled.</p><h2 id="add-a-setting" tabindex="-1">Add a setting <a class="header-anchor" href="#add-a-setting" aria-hidden="true">#</a></h2><p>To add a settings you have to select the group (or <code>No group</code>) in which you want to create your setting first. After that, hit <code>Add setting</code> and select the formfield type you want from the dropdown.</p><h2 id="remove-a-setting" tabindex="-1">Remove a setting <a class="header-anchor" href="#remove-a-setting" aria-hidden="true">#</a></h2><p>Click the <code>Trash</code> button and confirm that you want to delete this setting.</p><h2 id="duplicate-a-setting" tabindex="-1">Duplicate a setting <a class="header-anchor" href="#duplicate-a-setting" aria-hidden="true">#</a></h2><p>Click the <code>Layer</code> button to duplicate a setting.</p><h2 id="generate-the-key-for-a-setting" tabindex="-1">Generate the key for a setting <a class="header-anchor" href="#generate-the-key-for-a-setting" aria-hidden="true">#</a></h2><p>The key of a setting is basically the slugged version of the name. It is used to retreive the setting when calling <code>Voyager::setting()</code>. You can create this key by hitting the <code>Fingerprint</code> button, or by entering it manually.</p><h2 id="move-a-setting" tabindex="-1">Move a setting <a class="header-anchor" href="#move-a-setting" aria-hidden="true">#</a></h2><p>Click and hold the <code>Arrow</code> button and move the setting to your desired position.</p><h2 id="change-the-group-of-a-setting" tabindex="-1">Change the group of a setting <a class="header-anchor" href="#change-the-group-of-a-setting" aria-hidden="true">#</a></h2><p>Simply select the new group in the dropdown and it will be moved.</p><h2 id="getting-settings-from-code" tabindex="-1">Getting settings from code <a class="header-anchor" href="#getting-settings-from-code" aria-hidden="true">#</a></h2><p>To get all settings, call <code>Voyager::setting()</code> without any parameters. Use <code>Voyager::setting(&#39;my-group&#39;)</code> to get all settings in a group <strong>or</strong> a setting with this name without a group.<br> And to get a single setting in a group call <code>Voyager::setting(&#39;group.name&#39;)</code>.</p><h3 id="default-value" tabindex="-1">Default value <a class="header-anchor" href="#default-value" aria-hidden="true">#</a></h3><p>Pass a second parameter with the default value to <code>Voyager::setting</code> to get this value when the setting does not exist.</p><h3 id="translate" tabindex="-1">Translate <a class="header-anchor" href="#translate" aria-hidden="true">#</a></h3><p>By default settings will be translated.<br> To prevent this pass a third parameter as <code>false</code>.</p><h2 id="writing-settings-from-code" tabindex="-1">Writing settings from code <a class="header-anchor" href="#writing-settings-from-code" aria-hidden="true">#</a></h2><p>Use <code>SettingsManager::set(&#39;key&#39;, &#39;value&#39;)</code> to set a non-translatable setting.</p><p>Use <code>SettingsManager::set(&#39;key&#39;, [&#39;en&#39; =&gt; &#39;English value&#39;, &#39;de&#39; =&gt; &#39;Deutscher Wert&#39;])</code> to set multiple locales or <code>SettingsManager::set(&#39;key&#39;, &#39;English value&#39;, &#39;en&#39;)</code> to set a single locale</p><h2 id="batch-update" tabindex="-1">Batch update <a class="header-anchor" href="#batch-update" aria-hidden="true">#</a></h2><p>By default, when calling <code>SettingsManager::set(...)</code> the settings file will be stored on the disk.<br> You can prevent this by passing an optional fourth parameter <code>save</code> as <code>false</code>.<br> When you are done setting all your settings, you have to call <code>SettingsManager::save()</code>.</p>',25),o=[s];function r(d,g,l,h,c,u){return a(),t("div",null,o)}var v=e(i,[["render",r]]);export{f as __pageData,v as default};

/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => BetterMarkdownLinksPlugin
});
module.exports = __toCommonJS(main_exports);

// src/BetterMarkdownLinksPlugin.ts
var import_obsidian5 = require("obsidian");

// src/BetterMarkdownLinksPluginSettings.ts
var BetterMarkdownLinksPluginSettings = class _BetterMarkdownLinksPluginSettings {
  automaticallyConvertNewLinks = true;
  automaticallyUpdateLinksOnRenameOrMove = true;
  ignoreIncompatibleObsidianSettings = false;
  useAngleBrackets = true;
  useLeadingDot = true;
  static load(data) {
    return _BetterMarkdownLinksPluginSettings.clone(data);
  }
  static clone(settings) {
    const target = new _BetterMarkdownLinksPluginSettings();
    if (settings) {
      for (const key of Object.keys(target)) {
        if (key in settings && typeof settings[key] === typeof target[key]) {
          target[key] = settings[key];
        }
      }
    }
    return target;
  }
};

// src/BetterMarkdownLinksPluginSettingsTab.ts
var import_obsidian = require("obsidian");
var BetterMarkdownLinksPluginSettingsTab = class extends import_obsidian.PluginSettingTab {
  plugin;
  constructor(plugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }
  display() {
    this.containerEl.empty();
    const settings = this.plugin.settings;
    new import_obsidian.Setting(this.containerEl).setName("Use leading dot").setDesc("Use a leading dot in relative links").addToggle(
      (toggle) => toggle.setValue(settings.useLeadingDot).onChange(async (value) => {
        settings.useLeadingDot = value;
        await this.plugin.saveSettings(settings);
      })
    );
    new import_obsidian.Setting(this.containerEl).setName("Use angle brackets").setDesc("Use angle brackets in links").addToggle(
      (toggle) => toggle.setValue(settings.useAngleBrackets).onChange(async (value) => {
        settings.useAngleBrackets = value;
        await this.plugin.saveSettings(settings);
      })
    );
    new import_obsidian.Setting(this.containerEl).setName("Automatically convert new links").setDesc("Automatically convert new links entered manually to the selected format").addToggle(
      (toggle) => toggle.setValue(settings.automaticallyConvertNewLinks).onChange(async (value) => {
        settings.automaticallyConvertNewLinks = value;
        await this.plugin.saveSettings(settings);
      })
    );
    new import_obsidian.Setting(this.containerEl).setName("Automatically update links on rename or move").setDesc(createDocumentFragment('Automatically update links when a file is renamed or moved to another directory.<br>Consider installing <a href="obsidian://show-plugin?id=backlink-cache">Backlink Cache</a> plugin to improve performance.')).addToggle(
      (toggle) => toggle.setValue(settings.automaticallyUpdateLinksOnRenameOrMove).onChange(async (value) => {
        settings.automaticallyUpdateLinksOnRenameOrMove = value;
        await this.plugin.saveSettings(settings);
      })
    );
    new import_obsidian.Setting(this.containerEl).setName("Ignore incompatible Obsidian settings").setDesc(createDocumentFragment(`Current plugin makes sense only if you have <code>Use [[Wikilinks]]</code> disabled and <code>New link format</code> set to <code>Relative path to file</code> in Obsidian settings.<br>
If you enable current setting, it will override incompatible Obsidian settings and will work as expected.`)).addToggle(
      (toggle) => toggle.setValue(settings.ignoreIncompatibleObsidianSettings).onChange(async (value) => {
        settings.ignoreIncompatibleObsidianSettings = value;
        await this.plugin.saveSettings(settings);
      })
    );
  }
};
function createDocumentFragment(html) {
  return document.createRange().createContextualFragment(html);
}

// node_modules/monkey-around/dist/index.mjs
function around(obj, factories) {
  const removers = Object.keys(factories).map((key) => around1(obj, key, factories[key]));
  return removers.length === 1 ? removers[0] : function() {
    removers.forEach((r) => r());
  };
}
function around1(obj, method, createWrapper) {
  const inherited = obj[method], hadOwn = obj.hasOwnProperty(method), original = hadOwn ? inherited : function() {
    return Object.getPrototypeOf(obj)[method].apply(this, arguments);
  };
  let current = createWrapper(original);
  if (inherited)
    Object.setPrototypeOf(current, inherited);
  Object.setPrototypeOf(wrapper, current);
  obj[method] = wrapper;
  return remove;
  function wrapper(...args) {
    if (current === original && obj[method] === wrapper)
      remove();
    return current.apply(this, args);
  }
  function remove() {
    if (obj[method] === wrapper) {
      if (hadOwn)
        obj[method] = original;
      else
        delete obj[method];
    }
    if (current === original)
      return;
    current = original;
    Object.setPrototypeOf(wrapper, inherited || Function);
  }
}

// src/Error.ts
var import_obsidian2 = require("obsidian");
function showError(error) {
  console.error(error);
  new import_obsidian2.Notice("An unhandled error occurred. Please check the console for more information.");
}

// src/Async.ts
async function retryWithTimeout(asyncFn, {
  timeoutInMilliseconds = 5e3,
  retryDelayInMilliseconds = 100
} = {}) {
  await runWithTimeout(timeoutInMilliseconds, async () => {
    let failedBefore = false;
    while (true) {
      if (await asyncFn()) {
        if (failedBefore) {
          console.debug("Retry completed successfully");
        }
        return;
      }
      failedBefore = true;
      console.debug(`Retry completed unsuccessfully. Trying again in ${retryDelayInMilliseconds} milliseconds`);
      await sleep(retryDelayInMilliseconds);
    }
  });
}
async function runWithTimeout(timeoutInMilliseconds, asyncFn) {
  return await Promise.race([asyncFn(), timeout()]);
  async function timeout() {
    await sleep(timeoutInMilliseconds);
    throw new Error(`Timed out in ${timeoutInMilliseconds} milliseconds`);
  }
}
function convertToSync(promise) {
  promise.catch(showError);
}

// src/MetadataCache.ts
async function getCacheSafe(app, file) {
  let cache = null;
  await retryWithTimeout(async () => {
    const fileInfo = app.metadataCache.getFileInfo(file.path);
    const stat = await app.vault.adapter.stat(file.path);
    if (!fileInfo) {
      console.debug(`File cache info for ${file.path} is missing`);
      return false;
    } else if (!stat) {
      console.debug(`File stat for ${file.path} is missing`);
      return false;
    } else if (fileInfo.mtime < stat.mtime) {
      console.debug(`File cache info for ${file.path} is from ${new Date(fileInfo.mtime).toString()} which is older than the file modification timestamp ${new Date(stat.mtime).toString()}`);
      return false;
    } else {
      cache = app.metadataCache.getFileCache(file);
      if (!cache) {
        console.debug(`File cache for ${file.path} is missing`);
        return false;
      } else {
        return true;
      }
    }
  }, { timeoutInMilliseconds: 3e4 });
  return cache;
}
function getAllLinks(cache) {
  let links = [];
  if (cache.links) {
    links.push(...cache.links);
  }
  if (cache.embeds) {
    links.push(...cache.embeds);
  }
  links.sort((a, b) => a.position.start.offset - b.position.start.offset);
  links = links.filter((link, index) => {
    if (index === 0) {
      return true;
    }
    return link.position.start.offset !== links[index - 1].position.start.offset;
  });
  return links;
}

// src/BetterMarkdownLinksPlugin.ts
var import_posix2 = require("node:path/posix");

// src/GenerateMarkdownLink.ts
var import_posix = require("node:path/posix");

// src/TFile.ts
var MARKDOWN_FILE_EXTENSION = "md";
function isMarkdownFile(file) {
  return file.extension.toLowerCase() === MARKDOWN_FILE_EXTENSION;
}
function trimMarkdownExtension(file) {
  if (!isMarkdownFile(file)) {
    return file.path;
  }
  return file.path.slice(0, -(MARKDOWN_FILE_EXTENSION.length + 1));
}

// src/ObsidianSettings.ts
var import_obsidian3 = require("obsidian");
var warningNotice = new import_obsidian3.Notice("");
warningNotice.hide();
function checkObsidianSettingsCompatibility(plugin) {
  const app = plugin.app;
  if (plugin.settings.ignoreIncompatibleObsidianSettings) {
    return true;
  }
  if (!shouldUseWikilinks(app) && shouldUseRelativeLinks(app)) {
    return true;
  }
  plugin.showCompatibilityWarning();
  return false;
}
function shouldUseWikilinks(app) {
  return !app.vault.getConfig("useMarkdownLinks");
}
function shouldUseRelativeLinks(app) {
  return app.vault.getConfig("newLinkFormat") === "relative";
}

// src/GenerateMarkdownLink.ts
var SPECIAL_LINK_SYMBOLS_REGEXP = /[\\\x00\x08\x0B\x0C\x0E-\x1F ]/g;
function generateMarkdownLink(plugin, file, sourcePath, subpath, alias, isEmbed, isWikilink) {
  const app = plugin.app;
  const settings = plugin.settings;
  subpath ??= "";
  alias ??= "";
  isEmbed ??= !isMarkdownFile(file);
  isWikilink ??= !settings.ignoreIncompatibleObsidianSettings && shouldUseWikilinks(app);
  const useRelativePath = settings.ignoreIncompatibleObsidianSettings || shouldUseRelativeLinks(app);
  let linkText = file.path === sourcePath && subpath ? subpath : useRelativePath ? (0, import_posix.relative)((0, import_posix.dirname)(sourcePath), isWikilink ? trimMarkdownExtension(file) : file.path) + subpath : app.metadataCache.fileToLinktext(file, sourcePath, isWikilink) + subpath;
  if (useRelativePath && settings.useLeadingDot && !linkText.startsWith(".") && !linkText.startsWith("#")) {
    linkText = "./" + linkText;
  }
  if (!isWikilink) {
    if (settings.useAngleBrackets) {
      linkText = `<${linkText}>`;
    } else {
      linkText = linkText.replace(SPECIAL_LINK_SYMBOLS_REGEXP, function(specialLinkSymbol) {
        return encodeURIComponent(specialLinkSymbol);
      });
    }
    if (!isEmbed) {
      return `[${alias || file.basename}](${linkText})`;
    } else {
      return `![${alias}](${linkText})`;
    }
  } else {
    if (alias && alias.toLowerCase() === linkText.toLowerCase()) {
      linkText = alias;
      alias = "";
    }
    return (isEmbed ? "!" : "") + (alias ? `[[${linkText}|${alias}]]` : `[[${linkText}]]`);
  }
}

// src/LinkConverter.ts
var import_obsidian4 = require("obsidian");

// src/Object.ts
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null || a === void 0 || b === void 0) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  const aRecord = a;
  const bRecord = b;
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(aRecord[key], bRecord[key])) {
      return false;
    }
  }
  return true;
}
function toJson(value) {
  return JSON.stringify(value, null, 2);
}

// src/Vault.ts
async function processWithRetry(app, file, processFn) {
  await retryWithTimeout(async () => {
    const oldContent = await app.vault.adapter.read(file.path);
    const newContent = await processFn(oldContent);
    let success = true;
    await app.vault.process(file, (content) => {
      if (content !== oldContent) {
        console.warn(`Content of ${file.path} has changed since it was read. Retrying...`);
        success = false;
        return content;
      }
      return newContent;
    });
    return success;
  });
}
async function applyFileChanges(app, file, changesFn) {
  await processWithRetry(app, file, async (content) => {
    let changes = await changesFn();
    changes.sort((a, b) => a.startIndex - b.startIndex);
    changes = changes.filter((change, index) => {
      if (index === 0) {
        return true;
      }
      return !deepEqual(change, changes[index - 1]);
    });
    for (let i = 1; i < changes.length; i++) {
      if (changes[i - 1].endIndex >= changes[i].startIndex) {
        throw new Error(`Overlapping changes:
${toJson(changes[i - 1])}
${toJson(changes[i])}`);
      }
    }
    let newContent = "";
    let lastIndex = 0;
    for (const change of changes) {
      newContent += content.slice(lastIndex, change.startIndex);
      newContent += change.newContent;
      lastIndex = change.endIndex;
    }
    newContent += content.slice(lastIndex);
    return newContent;
  });
}

// src/LinkConverter.ts
function convertLinksInCurrentFile(plugin, checking) {
  const activeFile = plugin.app.workspace.getActiveFile();
  if (!activeFile || !isMarkdownFile(activeFile)) {
    return false;
  }
  if (!checking) {
    convertToSync(convertLinksInFile(plugin, activeFile));
  }
  return true;
}
async function convertLinksInFile(plugin, file) {
  if (!checkObsidianSettingsCompatibility(plugin)) {
    return;
  }
  await applyFileChanges(plugin.app, file, async () => getAllLinks(await getCacheSafe(plugin.app, file)).map((link) => ({
    startIndex: link.position.start.offset,
    endIndex: link.position.end.offset,
    newContent: convertLink(plugin, link, file)
  })));
}
async function convertLinksInEntireVault(plugin) {
  if (!checkObsidianSettingsCompatibility(plugin)) {
    return;
  }
  const mdFiles = plugin.app.vault.getMarkdownFiles().sort((a, b) => a.path.localeCompare(b.path));
  let index = 0;
  const notice = new import_obsidian4.Notice("", 0);
  for (const file of mdFiles) {
    index++;
    const message = `Converting links in note # ${index} / ${mdFiles.length}: ${file.path}`;
    notice.setMessage(message);
    console.log(message);
    try {
      await convertLinksInFile(plugin, file);
    } catch (e) {
      showError(e);
    }
  }
  notice.hide();
}
async function applyLinkChangeUpdates(plugin, file, updates) {
  await applyFileChanges(plugin.app, file, () => updates.map((update) => ({
    startIndex: update.reference.position.start.offset,
    endIndex: update.reference.position.end.offset,
    newContent: fixChange(plugin, update.change, file)
  })));
}
function fixChange(plugin, change, file) {
  const match = change.match(/^!?\[(.*?)\]\(([^<]+?) .+?>\)$/);
  const isEmbed = change.startsWith("!");
  if (!match) {
    return change;
  }
  const alias = match[1];
  const escapedPath = match[2];
  const [linkPath = "", subpath] = splitSubpath(decodeURIComponent(escapedPath));
  const linkedFile = plugin.app.metadataCache.getFirstLinkpathDest(linkPath, file.path);
  if (!linkedFile) {
    return `${isEmbed ? "!" : ""}[${alias}](${escapedPath})`;
  }
  return generateMarkdownLink(plugin, linkedFile, file.path, subpath, alias, isEmbed, false);
}
async function updateLinksInFile(plugin, file, oldPath) {
  const app = plugin.app;
  await applyFileChanges(app, file, async () => getAllLinks(await getCacheSafe(app, file)).map((link) => ({
    startIndex: link.position.start.offset,
    endIndex: link.position.end.offset,
    newContent: convertLink(plugin, link, file, oldPath)
  })));
}
function extractLinkFile(app, link, oldPath) {
  const PARENT_DIRECTORY = "../";
  const [linkPath] = splitSubpath(link.link);
  let linkFile = app.metadataCache.getFirstLinkpathDest(linkPath, oldPath);
  if (!linkFile && linkPath.startsWith(PARENT_DIRECTORY)) {
    linkFile = app.metadataCache.getFirstLinkpathDest(linkPath.slice(PARENT_DIRECTORY.length), oldPath);
  }
  return linkFile;
}
function updateLink(plugin, link, file, source) {
  if (!file) {
    return link.original;
  }
  const isEmbed = link.original.startsWith("!");
  const isWikilink = plugin.settings.automaticallyConvertNewLinks ? void 0 : link.original.includes("[[");
  const [, subpath] = splitSubpath(link.link);
  return generateMarkdownLink(plugin, file, source.path, subpath, link.displayText, isEmbed, isWikilink);
}
function convertLink(plugin, link, source, oldPath) {
  oldPath ??= source.path;
  return updateLink(plugin, link, extractLinkFile(plugin.app, link, oldPath), source);
}
function splitSubpath(link) {
  const SUBPATH_SEPARATOR = "#";
  const [linkPath = "", subpath] = link.split(SUBPATH_SEPARATOR);
  return [linkPath, subpath ? "#" + subpath : void 0];
}

// src/BetterMarkdownLinksPlugin.ts
var BetterMarkdownLinksPlugin = class extends import_obsidian5.Plugin {
  _settings;
  warningNotice;
  get settings() {
    return BetterMarkdownLinksPluginSettings.clone(this._settings);
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new BetterMarkdownLinksPluginSettingsTab(this));
    this.register(around(this.app.fileManager, {
      "generateMarkdownLink": () => (file, sourcePath, subpath, alias, isEmbed, isWikilink) => generateMarkdownLink(this, file, sourcePath, subpath, alias, isEmbed, isWikilink)
    }));
    this.addCommand({
      id: "convert-links-in-current-file",
      name: "Convert links in current file",
      checkCallback: (checking) => convertLinksInCurrentFile(this, checking)
    });
    this.addCommand({
      id: "convert-links-in-entire-vault",
      name: "Convert links in entire vault",
      callback: () => convertLinksInEntireVault(this)
    });
    this.registerEvent(this.app.metadataCache.on("changed", (file) => convertToSync(this.handleMetadataCacheChanged(file))));
    this.registerEvent(this.app.vault.on("rename", (file, oldPath) => convertToSync(this.handleRename(file, oldPath))));
    this.warningNotice = new import_obsidian5.Notice("");
    this.warningNotice.hide();
    this.app.fileManager.linkUpdaters[MARKDOWN_FILE_EXTENSION] = {
      applyUpdates: (file, updates) => applyLinkChangeUpdates(this, file, updates),
      iterateReferences: () => {
      },
      renameSubpath: async () => {
      }
    };
    this.register(() => {
      delete this.app.fileManager.linkUpdaters[MARKDOWN_FILE_EXTENSION];
    });
  }
  async saveSettings(newSettings) {
    this._settings = BetterMarkdownLinksPluginSettings.clone(newSettings);
    await this.saveData(this._settings);
  }
  async loadSettings() {
    this._settings = BetterMarkdownLinksPluginSettings.load(await this.loadData());
  }
  showCompatibilityWarning() {
    const message = 'Your Obsidian settings are incompatible with the "Better Markdown Links" plugin. Please disable "Use [[Wikilinks]]" and set "New link format" to "Relative path to file" in Obsidian settings.\nAlternatively, you can enable the "Ignore incompatible Obsidian settings" option in the plugin settings.';
    console.warn(message);
    if (this.warningNotice.noticeEl.style.opacity === "0") {
      this.warningNotice = new import_obsidian5.Notice(message, 1e4);
    }
  }
  async handleMetadataCacheChanged(file) {
    if (!this._settings.automaticallyConvertNewLinks) {
      return;
    }
    const suggestionContainer = document.querySelector(".suggestion-container");
    if (suggestionContainer && suggestionContainer.style.display !== "none") {
      return;
    }
    const cache = await getCacheSafe(this.app, file);
    const links = getAllLinks(cache);
    if (links.some((link) => link.original !== convertLink(this, link, file))) {
      await convertLinksInFile(this, file);
    }
  }
  async handleRename(file, oldPath) {
    if (!this._settings.automaticallyUpdateLinksOnRenameOrMove) {
      return;
    }
    if (!(file instanceof import_obsidian5.TFile)) {
      return;
    }
    if (isMarkdownFile(file) && file.parent?.path !== (0, import_posix2.dirname)(oldPath)) {
      await updateLinksInFile(this, file, oldPath);
    }
    await getCacheSafe(this.app, file);
    const backlinks = this.app.metadataCache.getBacklinksForFile(file);
    for (const parentNotePath of backlinks.keys()) {
      const parentNote = parentNotePath === oldPath ? file : this.app.vault.getFileByPath(parentNotePath);
      if (!parentNote) {
        showError(`Parent note not found: ${parentNotePath}`);
        continue;
      }
      await applyFileChanges(this.app, parentNote, () => (this.app.metadataCache.getBacklinksForFile(file).get(parentNotePath) ?? []).map((link) => ({
        startIndex: link.position.start.offset,
        endIndex: link.position.end.offset,
        newContent: updateLink(this, link, file, parentNote)
      })));
    }
  }
};

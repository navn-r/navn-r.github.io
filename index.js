define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.eventOptions$1=_exports.eventOptions=eventOptions;_exports.insertNodeIntoTemplate=insertNodeIntoTemplate;_exports.internalProperty$1=_exports.internalProperty=internalProperty;_exports.property$1=_exports.property=property;_exports.query$1=_exports.query=query;_exports.queryAll$1=_exports.queryAll=queryAll;_exports.queryAssignedNodes$1=_exports.queryAssignedNodes=queryAssignedNodes;_exports.queryAsync$1=_exports.queryAsync=queryAsync;_exports.removeNodesFromTemplate=removeNodesFromTemplate;_exports.templateFactory$1=_exports.templateFactory=templateFactory;_exports.shadyTemplateFactory=_exports.selectionStyles=_exports.reparentNodes$1=_exports.reparentNodes=_exports.render$1=_exports.render$2=_exports.render=_exports.removeNodes$1=_exports.removeNodes=_exports.parts$1=_exports.parts=_exports.nothing$1=_exports.nothing=_exports.notEqual$1=_exports.notEqual=_exports.nodeMarker=_exports.noChange$1=_exports.noChange=_exports.markerRegex=_exports.marker=_exports.lastAttributeNameRegex=_exports.isTemplatePartActive$1=_exports.isTemplatePartActive=_exports.isPrimitive$1=_exports.isPrimitive=_exports.isIterable$1=_exports.isIterable=_exports.isDirective$1=_exports.isDirective=_exports.isCEPolyfill=_exports.html$2=_exports.html$1=_exports.html=_exports.directive$1=_exports.directive=_exports.defaultTemplateProcessor$1=_exports.defaultTemplateProcessor=_exports.defaultConverter$1=_exports.defaultConverter=_exports.customElement$1=_exports.customElement=_exports.css$1=_exports.css=_exports.createMarker$1=_exports.createMarker=_exports.boundAttributeSuffix=_exports.UpdatingElement$1=_exports.UpdatingElement=_exports.TemplateResult$3=_exports.TemplateResult$2=_exports.TemplateResult$1=_exports.TemplateResult=_exports.TemplateInstance$1=_exports.TemplateInstance=_exports.Template$1=_exports.Template=_exports.SVGTemplateResult$2=_exports.SVGTemplateResult$1=_exports.SVGTemplateResult=_exports.PropertyPart$1=_exports.PropertyPart=_exports.PropertyCommitter$1=_exports.PropertyCommitter=_exports.NodePart$1=_exports.NodePart=_exports.LitElement=_exports.FaIcon=_exports.EventPart$1=_exports.EventPart=_exports.DefaultTemplateProcessor$1=_exports.DefaultTemplateProcessor=_exports.CSSResult$1=_exports.CSSResult=_exports.BooleanAttributePart$1=_exports.BooleanAttributePart=_exports.AttributePart$1=_exports.AttributePart=_exports.AttributeCommitter$1=_exports.AttributeCommitter=_exports.$updatingElement=_exports.$templateResult=_exports.$templateInstance=_exports.$templateFactory=_exports.$template=_exports.$shadyRender=_exports.$selectionStyles=_exports.$render=_exports.$parts=_exports.$part=_exports.$modifyTemplate=_exports.$litHtml=_exports.$litElement=_exports.$jumpModuleDefault=_exports.$jumpModule=_exports.$faIcon=_exports.$dom=_exports.$directive=_exports.$defaultTemplateProcessor=_exports.$decorators=_exports.$cssTag=void 0;_exports.unsafeCSS$1=_exports.unsafeCSS=_exports.templateCaches$1=_exports.templateCaches=_exports.svg$2=_exports.svg$1=_exports.svg=_exports.supportsAdoptingStyleSheets$1=_exports.supportsAdoptingStyleSheets=void 0;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ /**
     * True if the custom elements polyfill is in use.
     */const isCEPolyfill="undefined"!==typeof window&&null!=window.customElements&&window.customElements.polyfillWrapFlushCallback!==void 0;/**
                                                                                                                                                                     * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
                                                                                                                                                                     * into another container (could be the same container), before `before`. If
                                                                                                                                                                     * `before` is null, it appends the nodes to the container.
                                                                                                                                                                     */_exports.isCEPolyfill=isCEPolyfill;const reparentNodes=(container,start,end=null,before=null)=>{while(start!==end){const n=start.nextSibling;container.insertBefore(start,before);start=n}};/**
    * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
    * `container`.
    */_exports.reparentNodes$1=_exports.reparentNodes=reparentNodes;const removeNodes=(container,start,end=null)=>{while(start!==end){const n=start.nextSibling;container.removeChild(start);start=n}};_exports.removeNodes$1=_exports.removeNodes=removeNodes;var dom={isCEPolyfill:isCEPolyfill,reparentNodes:reparentNodes,removeNodes:removeNodes};/**
    * @license
    * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */ /**
        * An expression marker with embedded unique key to avoid collision with
        * possible text in templates.
        */_exports.$dom=dom;const marker=`{{lit-${(Math.random()+"").slice(2)}}}`;/**
                                                                    * An expression marker used text-positions, multi-binding attributes, and
                                                                    * attributes with markup-like text values.
                                                                    */_exports.marker=marker;const nodeMarker=`<!--${marker}-->`;_exports.nodeMarker=nodeMarker;const markerRegex=new RegExp(`${marker}|${nodeMarker}`);/**
                                                                   * Suffix appended to all bound attribute names.
                                                                   */_exports.markerRegex=markerRegex;const boundAttributeSuffix="$lit$";/**
                                              * An updatable Template that tracks the location of dynamic parts.
                                              */_exports.boundAttributeSuffix=boundAttributeSuffix;class Template{constructor(result,element){this.parts=[];this.element=element;const nodesToRemove=[],stack=[],walker=document.createTreeWalker(element.content,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1);// Keeps track of the last index associated with a part. We try to delete
// unnecessary nodes, but we never want to associate two different parts
// to the same index. They must have a constant node between.
let lastPartIndex=0,index=-1,partIndex=0;const{strings,values:{length}}=result;while(partIndex<length){const node=walker.nextNode();if(null===node){// We've exhausted the content inside a nested template element.
// Because we still have parts (the outer for-loop), we know:
// - There is a template in the stack
// - The walker will find a nextNode outside the template
walker.currentNode=stack.pop();continue}index++;if(1===node.nodeType/* Node.ELEMENT_NODE */){if(node.hasAttributes()){const attributes=node.attributes,{length}=attributes;// Per
// https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
// attributes are not guaranteed to be returned in document order.
// In particular, Edge/IE can return them out of order, so we cannot
// assume a correspondence between part index and attribute index.
let count=0;for(let i=0;i<length;i++){if(endsWith(attributes[i].name,boundAttributeSuffix)){count++}}while(0<count--){// Get the template literal section leading up to the first
// expression in this attribute
const stringForPart=strings[partIndex],name=lastAttributeNameRegex.exec(stringForPart)[2],attributeLookupName=name.toLowerCase()+boundAttributeSuffix,attributeValue=node.getAttribute(attributeLookupName);// Find the attribute name
node.removeAttribute(attributeLookupName);const statics=attributeValue.split(markerRegex);this.parts.push({type:"attribute",index,name,strings:statics});partIndex+=statics.length-1}}if("TEMPLATE"===node.tagName){stack.push(node);walker.currentNode=node.content}}else if(3===node.nodeType/* Node.TEXT_NODE */){const data=node.data;if(0<=data.indexOf(marker)){const parent=node.parentNode,strings=data.split(markerRegex),lastIndex=strings.length-1;// Generate a new text node for each literal section
// These nodes are also used as the markers for node parts
for(let i=0;i<lastIndex;i++){let insert,s=strings[i];if(""===s){insert=createMarker()}else{const match=lastAttributeNameRegex.exec(s);if(null!==match&&endsWith(match[2],boundAttributeSuffix)){s=s.slice(0,match.index)+match[1]+match[2].slice(0,-boundAttributeSuffix.length)+match[3]}insert=document.createTextNode(s)}parent.insertBefore(insert,node);this.parts.push({type:"node",index:++index})}// If there's no text, we must insert a comment to mark our place.
// Else, we can trust it will stick around after cloning.
if(""===strings[lastIndex]){parent.insertBefore(createMarker(),node);nodesToRemove.push(node)}else{node.data=strings[lastIndex]}// We have a part for each match found
partIndex+=lastIndex}}else if(8===node.nodeType/* Node.COMMENT_NODE */){if(node.data===marker){const parent=node.parentNode;// Add a new marker node to be the startNode of the Part if any of
// the following are true:
//  * We don't have a previousSibling
//  * The previousSibling is already the start of a previous part
if(null===node.previousSibling||index===lastPartIndex){index++;parent.insertBefore(createMarker(),node)}lastPartIndex=index;this.parts.push({type:"node",index});// If we don't have a nextSibling, keep this node so we have an end.
// Else, we can remove it to save future costs.
if(null===node.nextSibling){node.data=""}else{nodesToRemove.push(node);index--}partIndex++}else{let i=-1;while(-1!==(i=node.data.indexOf(marker,i+1))){// Comment node has a binding marker inside, make an inactive part
// The binding won't work, but subsequent bindings will
// TODO (justinfagnani): consider whether it's even worth it to
// make bindings in comments work
this.parts.push({type:"node",index:-1});partIndex++}}}}// Remove text binding nodes after the walk to not disturb the TreeWalker
for(const n of nodesToRemove){n.parentNode.removeChild(n)}}}_exports.Template$1=_exports.Template=Template;const endsWith=(str,suffix)=>{const index=str.length-suffix.length;return 0<=index&&str.slice(index)===suffix},isTemplatePartActive=part=>-1!==part.index;_exports.isTemplatePartActive$1=_exports.isTemplatePartActive=isTemplatePartActive;// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker=()=>document.createComment("");/**
                                                               * This regex extracts the attribute name preceding an attribute-position
                                                               * expression. It does this by matching the syntax allowed for attributes
                                                               * against the string literal directly preceding the expression, assuming that
                                                               * the expression is in an attribute-value position.
                                                               *
                                                               * See attributes in the HTML spec:
                                                               * https://www.w3.org/TR/html5/syntax.html#elements-attributes
                                                               *
                                                               * " \x09\x0a\x0c\x0d" are HTML space characters:
                                                               * https://www.w3.org/TR/html5/infrastructure.html#space-characters
                                                               *
                                                               * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
                                                               * space character except " ".
                                                               *
                                                               * So an attribute is:
                                                               *  * The name: any character except a control character, space character, ('),
                                                               *    ("), ">", "=", or "/"
                                                               *  * Followed by zero or more space characters
                                                               *  * Followed by "="
                                                               *  * Followed by zero or more space characters
                                                               *  * Followed by:
                                                               *    * Any character except space, ('), ("), "<", ">", "=", (`), or
                                                               *    * (") then any non-("), or
                                                               *    * (') then any non-(')
                                                               */_exports.createMarker$1=_exports.createMarker=createMarker;const lastAttributeNameRegex=// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;_exports.lastAttributeNameRegex=lastAttributeNameRegex;var template={marker:marker,nodeMarker:nodeMarker,markerRegex:markerRegex,boundAttributeSuffix:boundAttributeSuffix,Template:Template,isTemplatePartActive:isTemplatePartActive,createMarker:createMarker,lastAttributeNameRegex:lastAttributeNameRegex};_exports.$template=template;const walkerNodeFilter=133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;/**
                                                                            * Removes the list of nodes from a Template safely. In addition to removing
                                                                            * nodes from the Template, the Template part indices are updated to match
                                                                            * the mutated Template DOM.
                                                                            *
                                                                            * As the template is walked the removal state is tracked and
                                                                            * part indices are adjusted as needed.
                                                                            *
                                                                            * div
                                                                            *   div#1 (remove) <-- start removing (removing node is div#1)
                                                                            *     div
                                                                            *       div#2 (remove)  <-- continue removing (removing node is still div#1)
                                                                            *         div
                                                                            * div <-- stop removing since previous sibling is the removing node (div#1,
                                                                            * removed 4 nodes)
                                                                            */function removeNodesFromTemplate(template,nodesToRemove){const{element:{content},parts}=template,walker=document.createTreeWalker(content,walkerNodeFilter,null,!1);let partIndex=nextActiveIndexInTemplateParts(parts),part=parts[partIndex],nodeIndex=-1,removeCount=0;const nodesToRemoveInTemplate=[];let currentRemovingNode=null;while(walker.nextNode()){nodeIndex++;const node=walker.currentNode;// End removal if stepped past the removing node
if(node.previousSibling===currentRemovingNode){currentRemovingNode=null}// A node to remove was found in the template
if(nodesToRemove.has(node)){nodesToRemoveInTemplate.push(node);// Track node we're removing
if(null===currentRemovingNode){currentRemovingNode=node}}// When removing, increment count by which to adjust subsequent part indices
if(null!==currentRemovingNode){removeCount++}while(part!==void 0&&part.index===nodeIndex){// If part is in a removed node deactivate it by setting index to -1 or
// adjust the index as needed.
part.index=null!==currentRemovingNode?-1:part.index-removeCount;// go to the next active part.
partIndex=nextActiveIndexInTemplateParts(parts,partIndex);part=parts[partIndex]}}nodesToRemoveInTemplate.forEach(n=>n.parentNode.removeChild(n))}const countNodes=node=>{let count=11===node.nodeType/* Node.DOCUMENT_FRAGMENT_NODE */?0:1;const walker=document.createTreeWalker(node,walkerNodeFilter,null,!1);while(walker.nextNode()){count++}return count},nextActiveIndexInTemplateParts=(parts,startIndex=-1)=>{for(let i=startIndex+1;i<parts.length;i++){const part=parts[i];if(isTemplatePartActive(part)){return i}}return-1};/**
    * Inserts the given node into the Template, optionally before the given
    * refNode. In addition to inserting the node into the Template, the Template
    * part indices are updated to match the mutated Template DOM.
    */function insertNodeIntoTemplate(template,node,refNode=null){const{element:{content},parts}=template;// If there's no refNode, then put node at end of template.
// No part indices need to be shifted in this case.
if(null===refNode||refNode===void 0){content.appendChild(node);return}const walker=document.createTreeWalker(content,walkerNodeFilter,null,!1);let partIndex=nextActiveIndexInTemplateParts(parts),insertCount=0,walkerIndex=-1;while(walker.nextNode()){walkerIndex++;const walkerNode=walker.currentNode;if(walkerNode===refNode){insertCount=countNodes(node);refNode.parentNode.insertBefore(node,refNode)}while(-1!==partIndex&&parts[partIndex].index===walkerIndex){// If we've inserted the node, simply adjust all subsequent parts
if(0<insertCount){while(-1!==partIndex){parts[partIndex].index+=insertCount;partIndex=nextActiveIndexInTemplateParts(parts,partIndex)}return}partIndex=nextActiveIndexInTemplateParts(parts,partIndex)}}}var modifyTemplate={removeNodesFromTemplate:removeNodesFromTemplate,insertNodeIntoTemplate:insertNodeIntoTemplate};/**
    * @license
    * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */_exports.$modifyTemplate=modifyTemplate;const directives=new WeakMap,directive=f=>(...args)=>{const d=f(...args);directives.set(d,!0);return d};/**
                                   * Brands a function as a directive factory function so that lit-html will call
                                   * the function during template rendering, rather than passing as a value.
                                   *
                                   * A _directive_ is a function that takes a Part as an argument. It has the
                                   * signature: `(part: Part) => void`.
                                   *
                                   * A directive _factory_ is a function that takes arguments for data and
                                   * configuration and returns a directive. Users of directive usually refer to
                                   * the directive factory as the directive. For example, "The repeat directive".
                                   *
                                   * Usually a template author will invoke a directive factory in their template
                                   * with relevant arguments, which will then return a directive function.
                                   *
                                   * Here's an example of using the `repeat()` directive factory that takes an
                                   * array and a function to render an item:
                                   *
                                   * ```js
                                   * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
                                   * ```
                                   *
                                   * When `repeat` is invoked, it returns a directive function that closes over
                                   * `items` and the template function. When the outer template is rendered, the
                                   * return directive function is called with the Part for the expression.
                                   * `repeat` then performs it's custom logic to render multiple items.
                                   *
                                   * @param f The directive factory function. Must be a function that returns a
                                   * function of the signature `(part: Part) => void`. The returned function will
                                   * be called with the part object.
                                   *
                                   * @example
                                   *
                                   * import {directive, html} from 'lit-html';
                                   *
                                   * const immutable = directive((v) => (part) => {
                                   *   if (part.value !== v) {
                                   *     part.setValue(v)
                                   *   }
                                   * });
                                   */_exports.directive$1=_exports.directive=directive;const isDirective=o=>{return"function"===typeof o&&directives.has(o)};_exports.isDirective$1=_exports.isDirective=isDirective;var directive$1={directive:directive,isDirective:isDirective};/**
    * @license
    * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */ /**
        * A sentinel value that signals that a value was handled by a directive and
        * should not be written to the DOM.
        */_exports.$directive=directive$1;const noChange={};/**
                             * A sentinel value that signals a NodePart to fully clear its content.
                             */_exports.noChange$1=_exports.noChange=noChange;const nothing={};_exports.nothing$1=_exports.nothing=nothing;var part={noChange:noChange,nothing:nothing};_exports.$part=part;class TemplateInstance{constructor(template,processor,options){this.__parts=[];this.template=template;this.processor=processor;this.options=options}update(values){let i=0;for(const part of this.__parts){if(part!==void 0){part.setValue(values[i])}i++}for(const part of this.__parts){if(part!==void 0){part.commit()}}}_clone(){// There are a number of steps in the lifecycle of a template instance's
// DOM fragment:
//  1. Clone - create the instance fragment
//  2. Adopt - adopt into the main document
//  3. Process - find part markers and create parts
//  4. Upgrade - upgrade custom elements
//  5. Update - set node, attribute, property, etc., values
//  6. Connect - connect to the document. Optional and outside of this
//     method.
//
// We have a few constraints on the ordering of these steps:
//  * We need to upgrade before updating, so that property values will pass
//    through any property setters.
//  * We would like to process before upgrading so that we're sure that the
//    cloned fragment is inert and not disturbed by self-modifying DOM.
//  * We want custom elements to upgrade even in disconnected fragments.
//
// Given these constraints, with full custom elements support we would
// prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
//
// But Safari does not implement CustomElementRegistry#upgrade, so we
// can not implement that order and still have upgrade-before-update and
// upgrade disconnected fragments. So we instead sacrifice the
// process-before-upgrade constraint, since in Custom Elements v1 elements
// must not modify their light DOM in the constructor. We still have issues
// when co-existing with CEv0 elements like Polymer 1, and with polyfills
// that don't strictly adhere to the no-modification rule because shadow
// DOM, which may be created in the constructor, is emulated by being placed
// in the light DOM.
//
// The resulting order is on native is: Clone, Adopt, Upgrade, Process,
// Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
// in one step.
//
// The Custom Elements v1 polyfill supports upgrade(), so the order when
// polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
// Connect.
const fragment=isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),stack=[],parts=this.template.parts,walker=document.createTreeWalker(fragment,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1);let partIndex=0,nodeIndex=0,part,node=walker.nextNode();// Loop through all the nodes and parts of a template
while(partIndex<parts.length){part=parts[partIndex];if(!isTemplatePartActive(part)){this.__parts.push(void 0);partIndex++;continue}// Progress the tree walker until we find our next part's node.
// Note that multiple parts may share the same node (attribute parts
// on a single element), so this loop may not run at all.
while(nodeIndex<part.index){nodeIndex++;if("TEMPLATE"===node.nodeName){stack.push(node);walker.currentNode=node.content}if(null===(node=walker.nextNode())){// We've exhausted the content inside a nested template element.
// Because we still have parts (the outer for-loop), we know:
// - There is a template in the stack
// - The walker will find a nextNode outside the template
walker.currentNode=stack.pop();node=walker.nextNode()}}// We've arrived at our part's node.
if("node"===part.type){const part=this.processor.handleTextExpression(this.options);part.insertAfterNode(node.previousSibling);this.__parts.push(part)}else{this.__parts.push(...this.processor.handleAttributeExpressions(node,part.name,part.strings,this.options))}partIndex++}if(isCEPolyfill){document.adoptNode(fragment);customElements.upgrade(fragment)}return fragment}}_exports.TemplateInstance$1=_exports.TemplateInstance=TemplateInstance;var templateInstance={TemplateInstance:TemplateInstance};_exports.$templateInstance=templateInstance;const policy=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:s=>s}),commentMarker=` ${marker} `;/**
                                      * The return type of `html`, which holds a Template and the values from
                                      * interpolated expressions.
                                      */class TemplateResult{constructor(strings,values,type,processor){this.strings=strings;this.values=values;this.type=type;this.processor=processor}/**
     * Returns a string of HTML used to create a `<template>` element.
     */getHTML(){const l=this.strings.length-1;let html="",isCommentBinding=!1;for(let i=0;i<l;i++){const s=this.strings[i],commentOpen=s.lastIndexOf("<!--");// For each binding we want to determine the kind of marker to insert
// into the template source before it's parsed by the browser's HTML
// parser. The marker type is based on whether the expression is in an
// attribute, text, or comment position.
//   * For node-position bindings we insert a comment with the marker
//     sentinel as its text content, like <!--{{lit-guid}}-->.
//   * For attribute bindings we insert just the marker sentinel for the
//     first binding, so that we support unquoted attribute bindings.
//     Subsequent bindings can use a comment marker because multi-binding
//     attributes must be quoted.
//   * For comment bindings we insert just the marker sentinel so we don't
//     close the comment.
//
// The following code scans the template source, but is *not* an HTML
// parser. We don't need to track the tree structure of the HTML, only
// whether a binding is inside a comment, and if not, if it appears to be
// the first binding in an attribute.
// We're in comment position if we have a comment open with no following
// comment close. Because <-- can appear in an attribute value there can
// be false positives.
isCommentBinding=(-1<commentOpen||isCommentBinding)&&-1===s.indexOf("-->",commentOpen+1);// Check to see if we have an attribute-like sequence preceding the
// expression. This can match "name=value" like structures in text,
// comments, and attribute values, so there can be false-positives.
const attributeMatch=lastAttributeNameRegex.exec(s);if(null===attributeMatch){// We're only in this branch if we don't have a attribute-like
// preceding sequence. For comments, this guards against unusual
// attribute values like <div foo="<!--${'bar'}">. Cases like
// <!-- foo=${'bar'}--> are handled correctly in the attribute branch
// below.
html+=s+(isCommentBinding?commentMarker:nodeMarker)}else{// For attributes we use just a marker sentinel, and also append a
// $lit$ suffix to the name to opt-out of attribute-specific parsing
// that IE and Edge do for style and certain SVG attributes.
html+=s.substr(0,attributeMatch.index)+attributeMatch[1]+attributeMatch[2]+boundAttributeSuffix+attributeMatch[3]+marker}}html+=this.strings[l];return html}getTemplateElement(){const template=document.createElement("template");let value=this.getHTML();if(policy!==void 0){// this is secure because `this.strings` is a TemplateStringsArray.
// TODO: validate this when
// https://github.com/tc39/proposal-array-is-template-object is
// implemented.
value=policy.createHTML(value)}template.innerHTML=value;return template}}/**
   * A TemplateResult for SVG fragments.
   *
   * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
   * SVG namespace, then modifies the template to remove the `<svg>` tag so that
   * clones only container the original fragment.
   */_exports.TemplateResult$3=_exports.TemplateResult$2=_exports.TemplateResult$1=_exports.TemplateResult=TemplateResult;class SVGTemplateResult extends TemplateResult{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const template=super.getTemplateElement(),content=template.content,svgElement=content.firstChild;content.removeChild(svgElement);reparentNodes(content,svgElement.firstChild);return template}}_exports.SVGTemplateResult$2=_exports.SVGTemplateResult$1=_exports.SVGTemplateResult=SVGTemplateResult;var templateResult={TemplateResult:TemplateResult,SVGTemplateResult:SVGTemplateResult};_exports.$templateResult=templateResult;const isPrimitive=value=>{return null===value||!("object"===typeof value||"function"===typeof value)};_exports.isPrimitive$1=_exports.isPrimitive=isPrimitive;const isIterable=value=>{return Array.isArray(value)||// eslint-disable-next-line @typescript-eslint/no-explicit-any
!!(value&&value[Symbol.iterator])};/**
    * Writes attribute values to the DOM for a group of AttributeParts bound to a
    * single attribute. The value is only set once even if there are multiple parts
    * for an attribute.
    */_exports.isIterable$1=_exports.isIterable=isIterable;class AttributeCommitter{constructor(element,name,strings){this.dirty=!0;this.element=element;this.name=name;this.strings=strings;this.parts=[];for(let i=0;i<strings.length-1;i++){this.parts[i]=this._createPart()}}/**
     * Creates a single part. Override this to create a differnt type of part.
     */_createPart(){return new AttributePart(this)}_getValue(){const strings=this.strings,l=strings.length-1,parts=this.parts;// If we're assigning an attribute via syntax like:
//    attr="${foo}"  or  attr=${foo}
// but not
//    attr="${foo} ${bar}" or attr="${foo} baz"
// then we don't want to coerce the attribute value into one long
// string. Instead we want to just return the value itself directly,
// so that sanitizeDOMValue can get the actual value rather than
// String(value)
// The exception is if v is an array, in which case we do want to smash
// it together into a string without calling String() on the array.
//
// This also allows trusted values (when using TrustedTypes) being
// assigned to DOM sinks without being stringified in the process.
if(1===l&&""===strings[0]&&""===strings[1]){const v=parts[0].value;if("symbol"===typeof v){return v+""}if("string"===typeof v||!isIterable(v)){return v}}let text="";for(let i=0;i<l;i++){text+=strings[i];const part=parts[i];if(part!==void 0){const v=part.value;if(isPrimitive(v)||!isIterable(v)){text+="string"===typeof v?v:v+""}else{for(const t of v){text+="string"===typeof t?t:t+""}}}}text+=strings[l];return text}commit(){if(this.dirty){this.dirty=!1;this.element.setAttribute(this.name,this._getValue())}}}/**
   * A Part that controls all or part of an attribute value.
   */_exports.AttributeCommitter$1=_exports.AttributeCommitter=AttributeCommitter;class AttributePart{constructor(committer){this.value=void 0;this.committer=committer}setValue(value){if(value!==noChange&&(!isPrimitive(value)||value!==this.value)){this.value=value;// If the value is a not a directive, dirty the committer so that it'll
// call setAttribute. If the value is a directive, it'll dirty the
// committer if it calls setValue().
if(!isDirective(value)){this.committer.dirty=!0}}}commit(){while(isDirective(this.value)){const directive=this.value;this.value=noChange;directive(this)}if(this.value===noChange){return}this.committer.commit()}}/**
   * A Part that controls a location within a Node tree. Like a Range, NodePart
   * has start and end locations and can set and update the Nodes between those
   * locations.
   *
   * NodeParts support several value types: primitives, Nodes, TemplateResults,
   * as well as arrays and iterables of those types.
   */_exports.AttributePart$1=_exports.AttributePart=AttributePart;class NodePart{constructor(options){this.value=void 0;this.__pendingValue=void 0;this.options=options}/**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */appendInto(container){this.startNode=container.appendChild(createMarker());this.endNode=container.appendChild(createMarker())}/**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */insertAfterNode(ref){this.startNode=ref;this.endNode=ref.nextSibling}/**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */appendIntoPart(part){part.__insert(this.startNode=createMarker());part.__insert(this.endNode=createMarker())}/**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */insertAfterPart(ref){ref.__insert(this.startNode=createMarker());this.endNode=ref.endNode;ref.endNode=this.startNode}setValue(value){this.__pendingValue=value}commit(){if(null===this.startNode.parentNode){return}while(isDirective(this.__pendingValue)){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this)}const value=this.__pendingValue;if(value===noChange){return}if(isPrimitive(value)){if(value!==this.value){this.__commitText(value)}}else if(value instanceof TemplateResult){this.__commitTemplateResult(value)}else if(value instanceof Node){this.__commitNode(value)}else if(isIterable(value)){this.__commitIterable(value)}else if(value===nothing){this.value=nothing;this.clear()}else{// Fallback, will render the string representation
this.__commitText(value)}}__insert(node){this.endNode.parentNode.insertBefore(node,this.endNode)}__commitNode(value){if(this.value===value){return}this.clear();this.__insert(value);this.value=value}__commitText(value){const node=this.startNode.nextSibling;value=null==value?"":value;// If `value` isn't already a string, we explicitly convert it here in case
// it can't be implicitly converted - i.e. it's a symbol.
const valueAsString="string"===typeof value?value:value+"";if(node===this.endNode.previousSibling&&3===node.nodeType/* Node.TEXT_NODE */){// If we only have a single text node between the markers, we can just
// set its value, rather than replacing it.
// TODO(justinfagnani): Can we just check if this.value is primitive?
node.data=valueAsString}else{this.__commitNode(document.createTextNode(valueAsString))}this.value=value}__commitTemplateResult(value){const template=this.options.templateFactory(value);if(this.value instanceof TemplateInstance&&this.value.template===template){this.value.update(value.values)}else{// Make sure we propagate the template processor from the TemplateResult
// so that we use its syntax extension, etc. The template factory comes
// from the render function options so that it can control template
// caching and preprocessing.
const instance=new TemplateInstance(template,value.processor,this.options),fragment=instance._clone();instance.update(value.values);this.__commitNode(fragment);this.value=instance}}__commitIterable(value){// For an Iterable, we create a new InstancePart per item, then set its
// value to the item. This is a little bit of overhead for every item in
// an Iterable, but it lets us recurse easily and efficiently update Arrays
// of TemplateResults that will be commonly returned from expressions like:
// array.map((i) => html`${i}`), by reusing existing TemplateInstances.
// If _value is an array, then the previous render was of an
// iterable and _value will contain the NodeParts from the previous
// render. If _value is not an array, clear this part and make a new
// array for NodeParts.
if(!Array.isArray(this.value)){this.value=[];this.clear()}// Lets us keep track of how many items we stamped so we can clear leftover
// items from a previous render
const itemParts=this.value;let partIndex=0,itemPart;for(const item of value){// Try to reuse an existing part
itemPart=itemParts[partIndex];// If no existing part, create a new one
if(itemPart===void 0){itemPart=new NodePart(this.options);itemParts.push(itemPart);if(0===partIndex){itemPart.appendIntoPart(this)}else{itemPart.insertAfterPart(itemParts[partIndex-1])}}itemPart.setValue(item);itemPart.commit();partIndex++}if(partIndex<itemParts.length){// Truncate the parts array so _value reflects the current state
itemParts.length=partIndex;this.clear(itemPart&&itemPart.endNode)}}clear(startNode=this.startNode){removeNodes(this.startNode.parentNode,startNode.nextSibling,this.endNode)}}/**
   * Implements a boolean attribute, roughly as defined in the HTML
   * specification.
   *
   * If the value is truthy, then the attribute is present with a value of
   * ''. If the value is falsey, the attribute is removed.
   */_exports.NodePart$1=_exports.NodePart=NodePart;class BooleanAttributePart{constructor(element,name,strings){this.value=void 0;this.__pendingValue=void 0;if(2!==strings.length||""!==strings[0]||""!==strings[1]){throw new Error("Boolean attributes can only contain a single expression")}this.element=element;this.name=name;this.strings=strings}setValue(value){this.__pendingValue=value}commit(){while(isDirective(this.__pendingValue)){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this)}if(this.__pendingValue===noChange){return}const value=!!this.__pendingValue;if(this.value!==value){if(value){this.element.setAttribute(this.name,"")}else{this.element.removeAttribute(this.name)}this.value=value}this.__pendingValue=noChange}}/**
   * Sets attribute values for PropertyParts, so that the value is only set once
   * even if there are multiple parts for a property.
   *
   * If an expression controls the whole property value, then the value is simply
   * assigned to the property under control. If there are string literals or
   * multiple expressions, then the strings are expressions are interpolated into
   * a string first.
   */_exports.BooleanAttributePart$1=_exports.BooleanAttributePart=BooleanAttributePart;class PropertyCommitter extends AttributeCommitter{constructor(element,name,strings){super(element,name,strings);this.single=2===strings.length&&""===strings[0]&&""===strings[1]}_createPart(){return new PropertyPart(this)}_getValue(){if(this.single){return this.parts[0].value}return super._getValue()}commit(){if(this.dirty){this.dirty=!1;// eslint-disable-next-line @typescript-eslint/no-explicit-any
this.element[this.name]=this._getValue()}}}_exports.PropertyCommitter$1=_exports.PropertyCommitter=PropertyCommitter;class PropertyPart extends AttributePart{}// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
_exports.PropertyPart$1=_exports.PropertyPart=PropertyPart;let eventOptionsSupported=!1;// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(()=>{try{const options={get capture(){eventOptionsSupported=!0;return!1}};// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.addEventListener("test",options,options);// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.removeEventListener("test",options,options)}catch(_e){// event options not supported
}})();class EventPart{constructor(element,eventName,eventContext){this.value=void 0;this.__pendingValue=void 0;this.element=element;this.eventName=eventName;this.eventContext=eventContext;this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(value){this.__pendingValue=value}commit(){while(isDirective(this.__pendingValue)){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this)}if(this.__pendingValue===noChange){return}const newListener=this.__pendingValue,oldListener=this.value,shouldRemoveListener=null==newListener||null!=oldListener&&(newListener.capture!==oldListener.capture||newListener.once!==oldListener.once||newListener.passive!==oldListener.passive),shouldAddListener=null!=newListener&&(null==oldListener||shouldRemoveListener);if(shouldRemoveListener){this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options)}if(shouldAddListener){this.__options=getOptions(newListener);this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)}this.value=newListener;this.__pendingValue=noChange}handleEvent(event){if("function"===typeof this.value){this.value.call(this.eventContext||this.element,event)}else{this.value.handleEvent(event)}}}// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
_exports.EventPart$1=_exports.EventPart=EventPart;const getOptions=o=>o&&(eventOptionsSupported?{capture:o.capture,passive:o.passive,once:o.once}:o.capture);var parts={isPrimitive:isPrimitive,isIterable:isIterable,AttributeCommitter:AttributeCommitter,AttributePart:AttributePart,NodePart:NodePart,BooleanAttributePart:BooleanAttributePart,PropertyCommitter:PropertyCommitter,PropertyPart:PropertyPart,EventPart:EventPart};_exports.$parts=parts;function templateFactory(result){let templateCache=templateCaches.get(result.type);if(templateCache===void 0){templateCache={stringsArray:new WeakMap,keyString:new Map};templateCaches.set(result.type,templateCache)}let template=templateCache.stringsArray.get(result.strings);if(template!==void 0){return template}// If the TemplateStringsArray is new, generate a key from the strings
// This key is shared between all templates with identical content
const key=result.strings.join(marker);// Check if we already have a Template for this key
template=templateCache.keyString.get(key);if(template===void 0){// If we have not seen this key before, create a new Template
template=new Template(result,result.getTemplateElement());// Cache the Template for this key
templateCache.keyString.set(key,template)}// Cache all future queries for this TemplateStringsArray
templateCache.stringsArray.set(result.strings,template);return template}const templateCaches=new Map;_exports.templateCaches$1=_exports.templateCaches=templateCaches;var templateFactory$1={templateFactory:templateFactory,templateCaches:templateCaches};_exports.$templateFactory=templateFactory$1;const parts$1=new WeakMap;/**
                                     * Renders a template result or other value to a container.
                                     *
                                     * To update a container with new values, reevaluate the template literal and
                                     * call `render` with the new result.
                                     *
                                     * @param result Any value renderable by NodePart - typically a TemplateResult
                                     *     created by evaluating a template tag like `html` or `svg`.
                                     * @param container A DOM parent to render to. The entire contents are either
                                     *     replaced, or efficiently updated if the same result type was previous
                                     *     rendered there.
                                     * @param options RenderOptions for the entire render tree rendered to this
                                     *     container. Render options must *not* change between renders to the same
                                     *     container, as those changes will not effect previously rendered DOM.
                                     */_exports.parts$1=_exports.parts=parts$1;const render=(result,container,options)=>{let part=parts$1.get(container);if(part===void 0){removeNodes(container,container.firstChild);parts$1.set(container,part=new NodePart(Object.assign({templateFactory},options)));part.appendInto(container)}part.setValue(result);part.commit()};_exports.render$2=_exports.render=render;var render$1={parts:parts$1,render:render};_exports.$render=render$1;class DefaultTemplateProcessor{/**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */handleAttributeExpressions(element,name,strings,options){const prefix=name[0];if("."===prefix){const committer=new PropertyCommitter(element,name.slice(1),strings);return committer.parts}if("@"===prefix){return[new EventPart(element,name.slice(1),options.eventContext)]}if("?"===prefix){return[new BooleanAttributePart(element,name.slice(1),strings)]}const committer=new AttributeCommitter(element,name,strings);return committer.parts}/**
     * Create parts for a text-position binding.
     * @param templateFactory
     */handleTextExpression(options){return new NodePart(options)}}_exports.DefaultTemplateProcessor$1=_exports.DefaultTemplateProcessor=DefaultTemplateProcessor;const defaultTemplateProcessor=new DefaultTemplateProcessor;_exports.defaultTemplateProcessor$1=_exports.defaultTemplateProcessor=defaultTemplateProcessor;var defaultTemplateProcessor$1={DefaultTemplateProcessor:DefaultTemplateProcessor,defaultTemplateProcessor:defaultTemplateProcessor};// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
_exports.$defaultTemplateProcessor=defaultTemplateProcessor$1;if("undefined"!==typeof window){(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0")}/**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   */const html=(strings,...values)=>new TemplateResult(strings,values,"html",defaultTemplateProcessor);/**
                                                                                                                    * Interprets a template literal as an SVG template that can efficiently
                                                                                                                    * render to and update a container.
                                                                                                                    */_exports.html$2=_exports.html$1=_exports.html=html;const svg=(strings,...values)=>new SVGTemplateResult(strings,values,"svg",defaultTemplateProcessor);_exports.svg$2=_exports.svg$1=_exports.svg=svg;var litHtml={html:html,svg:svg,DefaultTemplateProcessor:DefaultTemplateProcessor,defaultTemplateProcessor:defaultTemplateProcessor,directive:directive,isDirective:isDirective,removeNodes:removeNodes,reparentNodes:reparentNodes,noChange:noChange,nothing:nothing,AttributeCommitter:AttributeCommitter,AttributePart:AttributePart,BooleanAttributePart:BooleanAttributePart,EventPart:EventPart,isIterable:isIterable,isPrimitive:isPrimitive,NodePart:NodePart,PropertyCommitter:PropertyCommitter,PropertyPart:PropertyPart,parts:parts$1,render:render,templateCaches:templateCaches,templateFactory:templateFactory,TemplateInstance:TemplateInstance,SVGTemplateResult:SVGTemplateResult,TemplateResult:TemplateResult,createMarker:createMarker,isTemplatePartActive:isTemplatePartActive,Template:Template};_exports.$litHtml=litHtml;const getTemplateCacheKey=(type,scopeName)=>`${type}--${scopeName}`;let compatibleShadyCSSVersion=!0;if("undefined"===typeof window.ShadyCSS){compatibleShadyCSSVersion=!1}else if("undefined"===typeof window.ShadyCSS.prepareTemplateDom){console.warn(`Incompatible ShadyCSS version detected. `+`Please update to at least @webcomponents/webcomponentsjs@2.0.2 and `+`@webcomponents/shadycss@1.3.1.`);compatibleShadyCSSVersion=!1}/**
   * Template factory which scopes template DOM using ShadyCSS.
   * @param scopeName {string}
   */const shadyTemplateFactory=scopeName=>result=>{const cacheKey=getTemplateCacheKey(result.type,scopeName);let templateCache=templateCaches.get(cacheKey);if(templateCache===void 0){templateCache={stringsArray:new WeakMap,keyString:new Map};templateCaches.set(cacheKey,templateCache)}let template=templateCache.stringsArray.get(result.strings);if(template!==void 0){return template}const key=result.strings.join(marker);template=templateCache.keyString.get(key);if(template===void 0){const element=result.getTemplateElement();if(compatibleShadyCSSVersion){window.ShadyCSS.prepareTemplateDom(element,scopeName)}template=new Template(result,element);templateCache.keyString.set(key,template)}templateCache.stringsArray.set(result.strings,template);return template};_exports.shadyTemplateFactory=shadyTemplateFactory;const TEMPLATE_TYPES=["html","svg"],removeStylesFromLitTemplates=scopeName=>{TEMPLATE_TYPES.forEach(type=>{const templates=templateCaches.get(getTemplateCacheKey(type,scopeName));if(templates!==void 0){templates.keyString.forEach(template=>{const{element:{content}}=template,styles=new Set;// IE 11 doesn't support the iterable param Set constructor
Array.from(content.querySelectorAll("style")).forEach(s=>{styles.add(s)});removeNodesFromTemplate(template,styles)})}})},shadyRenderSet=new Set,prepareTemplateStyles=(scopeName,renderedDOM,template)=>{shadyRenderSet.add(scopeName);// If `renderedDOM` is stamped from a Template, then we need to edit that
// Template's underlying template element. Otherwise, we create one here
// to give to ShadyCSS, which still requires one while scoping.
const templateElement=!!template?template.element:document.createElement("template"),styles=renderedDOM.querySelectorAll("style"),{length}=styles;// Move styles out of rendered DOM and store.
// If there are no styles, skip unnecessary work
if(0===length){// Ensure prepareTemplateStyles is called to support adding
// styles via `prepareAdoptedCssText` since that requires that
// `prepareTemplateStyles` is called.
//
// ShadyCSS will only update styles containing @apply in the template
// given to `prepareTemplateStyles`. If no lit Template was given,
// ShadyCSS will not be able to update uses of @apply in any relevant
// template. However, this is not a problem because we only create the
// template for the purpose of supporting `prepareAdoptedCssText`,
// which doesn't support @apply at all.
window.ShadyCSS.prepareTemplateStyles(templateElement,scopeName);return}const condensedStyle=document.createElement("style");// Collect styles into a single style. This helps us make sure ShadyCSS
// manipulations will not prevent us from being able to fix up template
// part indices.
// NOTE: collecting styles is inefficient for browsers but ShadyCSS
// currently does this anyway. When it does not, this should be changed.
for(let i=0;i<length;i++){const style=styles[i];style.parentNode.removeChild(style);condensedStyle.textContent+=style.textContent}// Remove styles from nested templates in this scope.
removeStylesFromLitTemplates(scopeName);// And then put the condensed style into the "root" template passed in as
// `template`.
const content=templateElement.content;if(!!template){insertNodeIntoTemplate(template,condensedStyle,content.firstChild)}else{content.insertBefore(condensedStyle,content.firstChild)}// Note, it's important that ShadyCSS gets the template that `lit-html`
// will actually render so that it can update the style inside when
// needed (e.g. @apply native Shadow DOM case).
window.ShadyCSS.prepareTemplateStyles(templateElement,scopeName);const style=content.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==style){// When in native Shadow DOM, ensure the style created by ShadyCSS is
// included in initially rendered output (`renderedDOM`).
renderedDOM.insertBefore(style.cloneNode(!0),renderedDOM.firstChild)}else if(!!template){// When no style is left in the template, parts will be broken as a
// result. To fix this, we put back the style node ShadyCSS removed
// and then tell lit to remove that node from the template.
// There can be no style in the template in 2 cases (1) when Shady DOM
// is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
// is in use ShadyCSS removes the style if it contains no content.
// NOTE, ShadyCSS creates its own style so we can safely add/remove
// `condensedStyle` here.
content.insertBefore(condensedStyle,content.firstChild);const removes=new Set([condensedStyle]);removeNodesFromTemplate(template,removes)}},render$2=(result,container,options)=>{if(!options||"object"!==typeof options||!options.scopeName){throw new Error("The `scopeName` option is required.")}const scopeName=options.scopeName,hasRendered=parts$1.has(container),needsScoping=compatibleShadyCSSVersion&&11===container.nodeType/* Node.DOCUMENT_FRAGMENT_NODE */&&!!container.host,firstScopeRender=needsScoping&&!shadyRenderSet.has(scopeName),renderContainer=firstScopeRender?document.createDocumentFragment():container;render(result,renderContainer,Object.assign({templateFactory:shadyTemplateFactory(scopeName)},options));// When performing first scope render,
// (1) We've rendered into a fragment so that there's a chance to
// `prepareTemplateStyles` before sub-elements hit the DOM
// (which might cause them to render based on a common pattern of
// rendering in a custom element's `connectedCallback`);
// (2) Scope the template with ShadyCSS one time only for this scope.
// (3) Render the fragment into the container and make sure the
// container knows its `part` is the one we just rendered. This ensures
// DOM will be re-used on subsequent renders.
if(firstScopeRender){const part=parts$1.get(renderContainer);parts$1.delete(renderContainer);// ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
// that should apply to `renderContainer` even if the rendered value is
// not a TemplateInstance. However, it will only insert scoped styles
// into the document if `prepareTemplateStyles` has already been called
// for the given scope name.
const template=part.value instanceof TemplateInstance?part.value.template:void 0;prepareTemplateStyles(scopeName,renderContainer,template);removeNodes(container,container.firstChild);container.appendChild(renderContainer);parts$1.set(container,part)}// After elements have hit the DOM, update styling if this is the
// initial render to this container.
// This is needed whenever dynamic changes are made so it would be
// safest to do every render; however, this would regress performance
// so we leave it up to the user to call `ShadyCSS.styleElement`
// for dynamic changes.
if(!hasRendered&&needsScoping){window.ShadyCSS.styleElement(container.host)}};/**
                                         * Removes all style elements from Templates for the given scopeName.
                                         */_exports.render$1=render$2;var shadyRender={shadyTemplateFactory:shadyTemplateFactory,render:render$2,html:html,svg:svg,TemplateResult:TemplateResult};/**
    * @license
    * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */_exports.$shadyRender=shadyRender;var _a;/**
         * Use this module if you want to create your own base class extending
         * [[UpdatingElement]].
         * @packageDocumentation
         */ /*
             * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
             * replaced at compile time by the munged name for object[property]. We cannot
             * alias this function, so we have to use a small shim that has the same
             * behavior when not compiling.
             */window.JSCompiler_renameProperty=(prop,_obj)=>prop;const defaultConverter={toAttribute(value,type){switch(type){case Boolean:return value?"":null;case Object:case Array:// if the value is `null` or `undefined` pass this through
// to allow removing/no change behavior.
return null==value?value:JSON.stringify(value);}return value},fromAttribute(value,type){switch(type){case Boolean:return null!==value;case Number:return null===value?null:+value;case Object:case Array:return JSON.parse(value);}return value}};/**
    * Change function that returns true if `value` is different from `oldValue`.
    * This method is used as the default for a property's `hasChanged` function.
    */_exports.defaultConverter$1=_exports.defaultConverter=defaultConverter;const notEqual=(value,old)=>{// This ensures (old==NaN, value==NaN) always returns false
return old!==value&&(old===old||value===value)};_exports.notEqual$1=_exports.notEqual=notEqual;const defaultPropertyDeclaration={attribute:!0,type:String,converter:defaultConverter,reflect:!1,hasChanged:notEqual},STATE_HAS_UPDATED=1,STATE_UPDATE_REQUESTED=1<<2,STATE_IS_REFLECTING_TO_ATTRIBUTE=1<<3,STATE_IS_REFLECTING_TO_PROPERTY=1<<4,finalized="finalized";/**
                                * Base element class which manages element properties and attributes. When
                                * properties change, the `update` method is asynchronously called. This method
                                * should be supplied by subclassers to render updates as desired.
                                * @noInheritDoc
                                */class UpdatingElement extends HTMLElement{constructor(){super();this.initialize()}/**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */static get observedAttributes(){// note: piggy backing on this to ensure we're finalized.
this.finalize();const attributes=[];// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
this._classProperties.forEach((v,p)=>{const attr=this._attributeNameForProperty(p,v);if(attr!==void 0){this._attributeToPropertyMap.set(attr,p);attributes.push(attr)}});return attributes}/**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */ /** @nocollapse */static _ensureClassProperties(){// ensure private storage for property declarations.
if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;// NOTE: Workaround IE11 not supporting Map constructor argument.
const superProperties=Object.getPrototypeOf(this)._classProperties;if(superProperties!==void 0){superProperties.forEach((v,k)=>this._classProperties.set(k,v))}}}/**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */static createProperty(name,options=defaultPropertyDeclaration){// Note, since this can be called by the `@property` decorator which
// is called before `finalize`, we ensure storage exists for property
// metadata.
this._ensureClassProperties();this._classProperties.set(name,options);// Do not generate an accessor if the prototype already has one, since
// it would be lost otherwise and that would never be the user's intention;
// Instead, we expect users to call `requestUpdate` themselves from
// user-defined accessors. Note that if the super has an accessor we will
// still overwrite it
if(options.noAccessor||this.prototype.hasOwnProperty(name)){return}const key="symbol"===typeof name?Symbol():`__${name}`,descriptor=this.getPropertyDescriptor(name,key,options);if(descriptor!==void 0){Object.defineProperty(this.prototype,name,descriptor)}}/**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */static getPropertyDescriptor(name,key,options){return{// tslint:disable-next-line:no-any no symbol in index
get(){return this[key]},set(value){const oldValue=this[name];this[key]=value;this.requestUpdateInternal(name,oldValue,options)},configurable:!0,enumerable:!0}}/**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */static getPropertyOptions(name){return this._classProperties&&this._classProperties.get(name)||defaultPropertyDeclaration}/**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */static finalize(){// finalize any superclasses
const superCtor=Object.getPrototypeOf(this);if(!superCtor.hasOwnProperty(finalized)){superCtor.finalize()}this[finalized]=!0;this._ensureClassProperties();// initialize Map populated in observedAttributes
this._attributeToPropertyMap=new Map;// make any properties
// Note, only process "own" properties since this element will inherit
// any properties defined on the superClass, and finalization ensures
// the entire prototype chain is finalized.
if(this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const props=this.properties,propKeys=[...Object.getOwnPropertyNames(props),...("function"===typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(props):[])];// support symbols in properties (IE11 does not support this)
// This for/of is ok because propKeys is an array
for(const p of propKeys){// note, use of `any` is due to TypeSript lack of support for symbol in
// index types
// tslint:disable-next-line:no-any no symbol in index
this.createProperty(p,props[p])}}}/**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */static _attributeNameForProperty(name,options){const attribute=options.attribute;return!1===attribute?void 0:"string"===typeof attribute?attribute:"string"===typeof name?name.toLowerCase():void 0}/**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */static _valueHasChanged(value,old,hasChanged=notEqual){return hasChanged(value,old)}/**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */static _propertyValueFromAttribute(value,options){const type=options.type,converter=options.converter||defaultConverter,fromAttribute="function"===typeof converter?converter:converter.fromAttribute;return fromAttribute?fromAttribute(value,type):value}/**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */static _propertyValueToAttribute(value,options){if(options.reflect===void 0){return}const type=options.type,converter=options.converter,toAttribute=converter&&converter.toAttribute||defaultConverter.toAttribute;return toAttribute(value,type)}/**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */initialize(){this._updateState=0;this._updatePromise=new Promise(res=>this._enableUpdatingResolver=res);this._changedProperties=new Map;this._saveInstanceProperties();// ensures first update will be caught by an early access of
// `updateComplete`
this.requestUpdateInternal()}/**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */_saveInstanceProperties(){// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
this.constructor._classProperties.forEach((_v,p)=>{if(this.hasOwnProperty(p)){const value=this[p];delete this[p];if(!this._instanceProperties){this._instanceProperties=new Map}this._instanceProperties.set(p,value)}})}/**
     * Applies previously saved instance properties.
     */_applyInstanceProperties(){// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
// tslint:disable-next-line:no-any
this._instanceProperties.forEach((v,p)=>this[p]=v);this._instanceProperties=void 0}connectedCallback(){// Ensure first connection completes an update. Updates cannot complete
// before connection.
this.enableUpdating()}enableUpdating(){if(this._enableUpdatingResolver!==void 0){this._enableUpdatingResolver();this._enableUpdatingResolver=void 0}}/**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */disconnectedCallback(){}/**
                             * Synchronizes property values when attributes change.
                             */attributeChangedCallback(name,old,value){if(old!==value){this._attributeToProperty(name,value)}}_propertyToAttribute(name,value,options=defaultPropertyDeclaration){const ctor=this.constructor,attr=ctor._attributeNameForProperty(name,options);if(attr!==void 0){const attrValue=ctor._propertyValueToAttribute(value,options);// an undefined value does not change the attribute.
if(attrValue===void 0){return}// Track if the property is being reflected to avoid
// setting the property again via `attributeChangedCallback`. Note:
// 1. this takes advantage of the fact that the callback is synchronous.
// 2. will behave incorrectly if multiple attributes are in the reaction
// stack at time of calling. However, since we process attributes
// in `update` this should not be possible (or an extreme corner case
// that we'd like to discover).
// mark state reflecting
this._updateState=this._updateState|STATE_IS_REFLECTING_TO_ATTRIBUTE;if(null==attrValue){this.removeAttribute(attr)}else{this.setAttribute(attr,attrValue)}// mark state not reflecting
this._updateState=this._updateState&~STATE_IS_REFLECTING_TO_ATTRIBUTE}}_attributeToProperty(name,value){// Use tracking info to avoid deserializing attribute value if it was
// just set from a property setter.
if(this._updateState&STATE_IS_REFLECTING_TO_ATTRIBUTE){return}const ctor=this.constructor,propName=ctor._attributeToPropertyMap.get(name);// Note, hint this as an `AttributeMap` so closure clearly understands
// the type; it has issues with tracking types through statics
// tslint:disable-next-line:no-unnecessary-type-assertion
if(propName!==void 0){const options=ctor.getPropertyOptions(propName);// mark state reflecting
this._updateState=this._updateState|STATE_IS_REFLECTING_TO_PROPERTY;this[propName]=// tslint:disable-next-line:no-any
ctor._propertyValueFromAttribute(value,options);// mark state not reflecting
this._updateState=this._updateState&~STATE_IS_REFLECTING_TO_PROPERTY}}/**
     * This protected version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */requestUpdateInternal(name,oldValue,options){let shouldRequestUpdate=!0;// If we have a property key, perform property update steps.
if(name!==void 0){const ctor=this.constructor;options=options||ctor.getPropertyOptions(name);if(ctor._valueHasChanged(this[name],oldValue,options.hasChanged)){if(!this._changedProperties.has(name)){this._changedProperties.set(name,oldValue)}// Add to reflecting properties set.
// Note, it's important that every change has a chance to add the
// property to `_reflectingProperties`. This ensures setting
// attribute + property reflects correctly.
if(!0===options.reflect&&!(this._updateState&STATE_IS_REFLECTING_TO_PROPERTY)){if(this._reflectingProperties===void 0){this._reflectingProperties=new Map}this._reflectingProperties.set(name,options)}}else{// Abort the request if the property should not be considered changed.
shouldRequestUpdate=!1}}if(!this._hasRequestedUpdate&&shouldRequestUpdate){this._updatePromise=this._enqueueUpdate()}}/**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */requestUpdate(name,oldValue){this.requestUpdateInternal(name,oldValue);return this.updateComplete}/**
     * Sets up the element to asynchronously update.
     */_enqueueUpdate(){var _this=this;return babelHelpers.asyncToGenerator(function*(){_this._updateState=_this._updateState|STATE_UPDATE_REQUESTED;try{// Ensure any previous update has resolved before updating.
// This `await` also ensures that property changes are batched.
yield _this._updatePromise}catch(e){// Ignore any previous errors. We only care that the previous cycle is
// done. Any error should have been handled in the previous update.
}const result=_this.performUpdate();// If `performUpdate` returns a Promise, we await it. This is done to
// enable coordinating updates with a scheduler. Note, the result is
// checked to avoid delaying an additional microtask unless we need to.
if(null!=result){yield result}return!_this._hasRequestedUpdate})()}get _hasRequestedUpdate(){return this._updateState&STATE_UPDATE_REQUESTED}get hasUpdated(){return this._updateState&STATE_HAS_UPDATED}/**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */performUpdate(){// Abort any update if one is not pending when this is called.
// This can happen if `performUpdate` is called early to "flush"
// the update.
if(!this._hasRequestedUpdate){return}// Mixin instance properties once, if they exist.
if(this._instanceProperties){this._applyInstanceProperties()}let shouldUpdate=!1;const changedProperties=this._changedProperties;try{shouldUpdate=this.shouldUpdate(changedProperties);if(shouldUpdate){this.update(changedProperties)}else{this._markUpdated()}}catch(e){// Prevent `firstUpdated` and `updated` from running when there's an
// update exception.
shouldUpdate=!1;// Ensure element can accept additional updates after an exception.
this._markUpdated();throw e}if(shouldUpdate){if(!(this._updateState&STATE_HAS_UPDATED)){this._updateState=this._updateState|STATE_HAS_UPDATED;this.firstUpdated(changedProperties)}this.updated(changedProperties)}}_markUpdated(){this._changedProperties=new Map;this._updateState=this._updateState&~STATE_UPDATE_REQUESTED}/**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */get updateComplete(){return this._getUpdateComplete()}/**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */_getUpdateComplete(){return this._updatePromise}/**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */shouldUpdate(_changedProperties){return!0}/**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */update(_changedProperties){if(this._reflectingProperties!==void 0&&0<this._reflectingProperties.size){// Use forEach so this works even if for/of loops are compiled to for
// loops expecting arrays
this._reflectingProperties.forEach((v,k)=>this._propertyToAttribute(k,this[k],v));this._reflectingProperties=void 0}this._markUpdated()}/**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */updated(_changedProperties){}/**
                                  * Invoked when the element is first updated. Implement to perform one time
                                  * work on the element after update.
                                  *
                                  * Setting properties inside this method will trigger the element to update
                                  * again after this update cycle completes.
                                  *
                                  * @param _changedProperties Map of changed properties with old values
                                  */firstUpdated(_changedProperties){}}_exports.UpdatingElement$1=_exports.UpdatingElement=UpdatingElement;_a=finalized;/**
                 * Marks class as having finished creating properties.
                 */UpdatingElement[_a]=!0;var updatingElement={defaultConverter:defaultConverter,notEqual:notEqual,UpdatingElement:UpdatingElement};/**
    * @license
    * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
    * This code may only be used under the BSD style license found at
    * http://polymer.github.io/LICENSE.txt
    * The complete set of authors may be found at
    * http://polymer.github.io/AUTHORS.txt
    * The complete set of contributors may be found at
    * http://polymer.github.io/CONTRIBUTORS.txt
    * Code distributed by Google as part of the polymer project is also
    * subject to an additional IP rights grant found at
    * http://polymer.github.io/PATENTS.txt
    */_exports.$updatingElement=updatingElement;const legacyCustomElement=(tagName,clazz)=>{window.customElements.define(tagName,clazz);// Cast as any because TS doesn't recognize the return type as being a
// subtype of the decorated class when clazz is typed as
// `Constructor<HTMLElement>` for some reason.
// `Constructor<HTMLElement>` is helpful to make sure the decorator is
// applied to elements however.
// tslint:disable-next-line:no-any
return clazz},standardCustomElement=(tagName,descriptor)=>{const{kind,elements}=descriptor;return{kind,elements,// This callback is called once the class is otherwise fully defined
finisher(clazz){window.customElements.define(tagName,clazz)}}},customElement=tagName=>classOrDescriptor=>"function"===typeof classOrDescriptor?legacyCustomElement(tagName,classOrDescriptor):standardCustomElement(tagName,classOrDescriptor);_exports.customElement$1=_exports.customElement=customElement;const standardProperty=(options,element)=>{// When decorating an accessor, pass it through and add property metadata.
// Note, the `hasOwnProperty` check in `createProperty` ensures we don't
// stomp over the user's accessor.
if("method"===element.kind&&element.descriptor&&!("value"in element.descriptor)){return Object.assign(Object.assign({},element),{finisher(clazz){clazz.createProperty(element.key,options)}})}else{// createProperty() takes care of defining the property, but we still
// must return some kind of descriptor, so return a descriptor for an
// unused prototype field. The finisher calls createProperty().
return{kind:"field",key:Symbol(),placement:"own",descriptor:{},// When @babel/plugin-proposal-decorators implements initializers,
// do this instead of the initializer below. See:
// https://github.com/babel/babel/issues/9260 extras: [
//   {
//     kind: 'initializer',
//     placement: 'own',
//     initializer: descriptor.initializer,
//   }
// ],
initializer(){if("function"===typeof element.initializer){this[element.key]=element.initializer.call(this)}},finisher(clazz){clazz.createProperty(element.key,options)}}}},legacyProperty=(options,proto,name)=>{proto.constructor.createProperty(name,options)};/**
    * A property decorator which creates a LitElement property which reflects a
    * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
    * supplied to configure property features.
    *
    * This decorator should only be used for public fields. Private or protected
    * fields should use the [[`internalProperty`]] decorator.
    *
    * @example
    * ```ts
    * class MyElement {
    *   @property({ type: Boolean })
    *   clicked = false;
    * }
    * ```
    * @category Decorator
    * @ExportDecoratedItems
    */function property(options){// tslint:disable-next-line:no-any decorator
return(protoOrDescriptor,name)=>name!==void 0?legacyProperty(options,protoOrDescriptor,name):standardProperty(options,protoOrDescriptor)}/**
   * Declares a private or protected property that still triggers updates to the
   * element when it changes.
   *
   * Properties declared this way must not be used from HTML or HTML templating
   * systems, they're solely for properties internal to the element. These
   * properties may be renamed by optimization tools like closure compiler.
   * @category Decorator
   */function internalProperty(options){return property({attribute:!1,hasChanged:null===options||void 0===options?void 0:options.hasChanged})}/**
   * A property decorator that converts a class property into a getter that
   * executes a querySelector on the element's renderRoot.
   *
   * @param selector A DOMString containing one or more selectors to match.
   * @param cache An optional boolean which when true performs the DOM query only
   * once and caches the result.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
   *
   * @example
   *
   * ```ts
   * class MyElement {
   *   @query('#first')
   *   first;
   *
   *   render() {
   *     return html`
   *       <div id="first"></div>
   *       <div id="second"></div>
   *     `;
   *   }
   * }
   * ```
   * @category Decorator
   */function query(selector,cache){return(protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={get(){return this.renderRoot.querySelector(selector)},enumerable:!0,configurable:!0};if(cache){const key="symbol"===typeof name?Symbol():`__${name}`;descriptor.get=function(){if(this[key]===void 0){this[key]=this.renderRoot.querySelector(selector)}return this[key]}}return name!==void 0?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}// Note, in the future, we may extend this decorator to support the use case
// where the queried element may need to do work to become ready to interact
// with (e.g. load some implementation code). If so, we might elect to
// add a second argument defining a function that can be run to make the
// queried element loaded/updated/ready.
/**
 * A property decorator that converts a class property into a getter that
 * returns a promise that resolves to the result of a querySelector on the
 * element's renderRoot done after the element's `updateComplete` promise
 * resolves. When the queried property may change with element state, this
 * decorator can be used instead of requiring users to await the
 * `updateComplete` before accessing the property.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 * ```ts
 * class MyElement {
 *   @queryAsync('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 *
 * // external usage
 * async doSomethingWithFirst() {
 *  (await aMyElement.first).doSomething();
 * }
 * ```
 * @category Decorator
 */function queryAsync(selector){return(protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={get(){var _this2=this;return babelHelpers.asyncToGenerator(function*(){yield _this2.updateComplete;return _this2.renderRoot.querySelector(selector)})()},enumerable:!0,configurable:!0};return name!==void 0?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}/**
   * A property decorator that converts a class property into a getter
   * that executes a querySelectorAll on the element's renderRoot.
   *
   * @param selector A DOMString containing one or more selectors to match.
   *
   * See:
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
   *
   * @example
   * ```ts
   * class MyElement {
   *   @queryAll('div')
   *   divs;
   *
   *   render() {
   *     return html`
   *       <div id="first"></div>
   *       <div id="second"></div>
   *     `;
   *   }
   * }
   * ```
   * @category Decorator
   */function queryAll(selector){return(protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={get(){return this.renderRoot.querySelectorAll(selector)},enumerable:!0,configurable:!0};return name!==void 0?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}const legacyQuery=(descriptor,proto,name)=>{Object.defineProperty(proto,name,descriptor)},standardQuery=(descriptor,element)=>({kind:"method",placement:"prototype",key:element.key,descriptor}),standardEventOptions=(options,element)=>{return Object.assign(Object.assign({},element),{finisher(clazz){Object.assign(clazz.prototype[element.key],options)}})},legacyEventOptions=// tslint:disable-next-line:no-any legacy decorator
(options,proto,name)=>{Object.assign(proto[name],options)};/**
    * Adds event listener options to a method used as an event listener in a
    * lit-html template.
    *
    * @param options An object that specifies event listener options as accepted by
    * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
    *
    * Current browsers support the `capture`, `passive`, and `once` options. See:
    * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
    *
    * @example
    * ```ts
    * class MyElement {
    *   clicked = false;
    *
    *   render() {
    *     return html`
    *       <div @click=${this._onClick}`>
    *         <button></button>
    *       </div>
    *     `;
    *   }
    *
    *   @eventOptions({capture: true})
    *   _onClick(e) {
    *     this.clicked = true;
    *   }
    * }
    * ```
    * @category Decorator
    */function eventOptions(options){// Return value typed as any to prevent TypeScript from complaining that
// standard decorator function signature does not match TypeScript decorator
// signature
// TODO(kschaaf): unclear why it was only failing on this decorator and not
// the others
return(protoOrDescriptor,name)=>name!==void 0?legacyEventOptions(options,protoOrDescriptor,name):standardEventOptions(options,protoOrDescriptor)}// x-browser support for matches
// tslint:disable-next-line:no-any
const ElementProto=Element.prototype,legacyMatches=ElementProto.msMatchesSelector||ElementProto.webkitMatchesSelector;/**
                                                                                             * A property decorator that converts a class property into a getter that
                                                                                             * returns the `assignedNodes` of the given named `slot`. Note, the type of
                                                                                             * this property should be annotated as `NodeListOf<HTMLElement>`.
                                                                                             *
                                                                                             * @param slotName A string name of the slot.
                                                                                             * @param flatten A boolean which when true flattens the assigned nodes,
                                                                                             * meaning any assigned nodes that are slot elements are replaced with their
                                                                                             * assigned nodes.
                                                                                             * @param selector A string which filters the results to elements that match
                                                                                             * the given css selector.
                                                                                             *
                                                                                             * * @example
                                                                                             * ```ts
                                                                                             * class MyElement {
                                                                                             *   @queryAssignedNodes('list', true, '.item')
                                                                                             *   listItems;
                                                                                             *
                                                                                             *   render() {
                                                                                             *     return html`
                                                                                             *       <slot name="list"></slot>
                                                                                             *     `;
                                                                                             *   }
                                                                                             * }
                                                                                             * ```
                                                                                             * @category Decorator
                                                                                             */function queryAssignedNodes(slotName="",flatten=!1,selector=""){return(protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={get(){const slotSelector=`slot${slotName?`[name=${slotName}]`:":not([name])"}`,slot=this.renderRoot.querySelector(slotSelector);let nodes=slot&&slot.assignedNodes({flatten});if(nodes&&selector){nodes=nodes.filter(node=>node.nodeType===Node.ELEMENT_NODE&&node.matches?node.matches(selector):legacyMatches.call(node,selector))}return nodes},enumerable:!0,configurable:!0};return name!==void 0?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}var decorators={customElement:customElement,property:property,internalProperty:internalProperty,query:query,queryAsync:queryAsync,queryAll:queryAll,eventOptions:eventOptions,queryAssignedNodes:queryAssignedNodes};/**
   @license
   Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at
   http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
   http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
   found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
   part of the polymer project is also subject to an additional IP rights grant
   found at http://polymer.github.io/PATENTS.txt
   */ /**
       * Whether the current browser supports `adoptedStyleSheets`.
       */_exports.$decorators=decorators;const supportsAdoptingStyleSheets=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;_exports.supportsAdoptingStyleSheets$1=_exports.supportsAdoptingStyleSheets=supportsAdoptingStyleSheets;const constructionToken=Symbol();class CSSResult{constructor(cssText,safeToken){if(safeToken!==constructionToken){throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.")}this.cssText=cssText}// Note, this is a getter so that it's lazy. In practice, this means
// stylesheets are not created until the first element instance is made.
get styleSheet(){if(this._styleSheet===void 0){// Note, if `supportsAdoptingStyleSheets` is true then we assume
// CSSStyleSheet is constructable.
if(supportsAdoptingStyleSheets){this._styleSheet=new CSSStyleSheet;this._styleSheet.replaceSync(this.cssText)}else{this._styleSheet=null}}return this._styleSheet}toString(){return this.cssText}}/**
   * Wrap a value for interpolation in a [[`css`]] tagged template literal.
   *
   * This is unsafe because untrusted CSS text can be used to phone home
   * or exfiltrate data to an attacker controlled site. Take care to only use
   * this with trusted input.
   */_exports.CSSResult$1=_exports.CSSResult=CSSResult;const unsafeCSS=value=>{return new CSSResult(value+"",constructionToken)};_exports.unsafeCSS$1=_exports.unsafeCSS=unsafeCSS;const textFromCSSResult=value=>{if(value instanceof CSSResult){return value.cssText}else if("number"===typeof value){return value}else{throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)}},css=(strings,...values)=>{const cssText=values.reduce((acc,v,idx)=>acc+textFromCSSResult(v)+strings[idx+1],strings[0]);return new CSSResult(cssText,constructionToken)};/**
    * Template tag which which can be used with LitElement's [[LitElement.styles |
    * `styles`]] property to set element styles. For security reasons, only literal
    * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
    * may be used inside a template string part.
    */_exports.css$1=_exports.css=css;var cssTag={supportsAdoptingStyleSheets:supportsAdoptingStyleSheets,CSSResult:CSSResult,unsafeCSS:unsafeCSS,css:css};// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
_exports.$cssTag=cssTag;(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");/**
                                                                                      * Sentinal value used to avoid calling lit-html's render function when
                                                                                      * subclasses do not implement `render`
                                                                                      */const renderNotImplemented={};/**
                                  * Base element class that manages element properties and attributes, and
                                  * renders a lit-html template.
                                  *
                                  * To define a component, subclass `LitElement` and implement a
                                  * `render` method to provide the component's template. Define properties
                                  * using the [[`properties`]] property or the [[`property`]] decorator.
                                  */class LitElement extends UpdatingElement{/**
   * Return the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * @nocollapse
   */static getStyles(){return this.styles}/** @nocollapse */static _getUniqueStyles(){// Only gather styles once per class
if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this))){return}// Take care not to call `this.getStyles()` multiple times since this
// generates new CSSResults each time.
// TODO(sorvell): Since we do not cache CSSResults by input, any
// shared styles will generate new stylesheet objects, which is wasteful.
// This should be addressed when a browser ships constructable
// stylesheets.
const userStyles=this.getStyles();if(Array.isArray(userStyles)){// De-duplicate styles preserving the _last_ instance in the set.
// This is a performance optimization to avoid duplicated styles that can
// occur especially when composing via subclassing.
// The last item is kept to try to preserve the cascade order with the
// assumption that it's most important that last added styles override
// previous styles.
const addStyles=(styles,set)=>styles.reduceRight((set,s)=>// Note: On IE set.add() does not return the set
Array.isArray(s)?addStyles(s,set):(set.add(s),set),set),set=addStyles(userStyles,new Set),styles=[];// Array.from does not work on Set in IE, otherwise return
// Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
set.forEach(v=>styles.unshift(v));this._styles=styles}else{this._styles=userStyles===void 0?[]:[userStyles]}// Ensure that there are no invalid CSSStyleSheet instances here. They are
// invalid in two conditions.
// (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
//     this is impossible to check except via .replaceSync or use
// (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
//     false)
this._styles=this._styles.map(s=>{if(s instanceof CSSStyleSheet&&!supportsAdoptingStyleSheets){// Flatten the cssText from the passed constructible stylesheet (or
// undetectable non-constructible stylesheet). The user might have
// expected to update their stylesheets over time, but the alternative
// is a crash.
const cssText=Array.prototype.slice.call(s.cssRules).reduce((css,rule)=>css+rule.cssText,"");return unsafeCSS(cssText)}return s})}/**
     * Performs element initialization. By default this calls
     * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
     * captures any pre-set values for registered properties.
     */initialize(){super.initialize();this.constructor._getUniqueStyles();this.renderRoot=this.createRenderRoot();// Note, if renderRoot is not a shadowRoot, styles would/could apply to the
// element's getRootNode(). While this could be done, we're choosing not to
// support this now since it would require different logic around de-duping.
if(window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot){this.adoptStyles()}}/**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */createRenderRoot(){return this.attachShadow({mode:"open"})}/**
     * Applies styling to the element shadowRoot using the [[`styles`]]
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */adoptStyles(){const styles=this.constructor._styles;if(0===styles.length){return}// There are three separate cases here based on Shadow DOM support.
// (1) shadowRoot polyfilled: use ShadyCSS
// (2) shadowRoot.adoptedStyleSheets available: use it
// (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
// rendering
if(window.ShadyCSS!==void 0&&!window.ShadyCSS.nativeShadow){window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s=>s.cssText),this.localName)}else if(supportsAdoptingStyleSheets){this.renderRoot.adoptedStyleSheets=styles.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet)}else{// This must be done after rendering so the actual style insertion is done
// in `update`.
this._needsShimAdoptedStyleSheets=!0}}connectedCallback(){super.connectedCallback();// Note, first update/render handles styleElement so we only call this if
// connected after first update.
if(this.hasUpdated&&window.ShadyCSS!==void 0){window.ShadyCSS.styleElement(this)}}/**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */update(changedProperties){// Setting properties in `render` should not trigger an update. Since
// updates are allowed after super.update, it's important to call `render`
// before that.
const templateResult=this.render();super.update(changedProperties);// If render is not implemented by the component, don't call lit-html render
if(templateResult!==renderNotImplemented){this.constructor.render(templateResult,this.renderRoot,{scopeName:this.localName,eventContext:this})}// When native Shadow DOM is used but adoptedStyles are not supported,
// insert styling after rendering to ensure adoptedStyles have highest
// priority.
if(this._needsShimAdoptedStyleSheets){this._needsShimAdoptedStyleSheets=!1;this.constructor._styles.forEach(s=>{const style=document.createElement("style");style.textContent=s.cssText;this.renderRoot.appendChild(style)})}}/**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `NodePart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     */render(){return renderNotImplemented}}/**
   * Ensure this class is marked as `finalized` as an optimization ensuring
   * it will not needlessly try to `finalize`.
   *
   * Note this property name is a string to prevent breaking Closure JS Compiler
   * optimizations. See updating-element.ts for more information.
   */_exports.LitElement=LitElement;LitElement.finalized=!0;/**
                                 * Reference to the underlying library method used to render the element's
                                 * DOM. By default, points to the `render` method from lit-html's shady-render
                                 * module.
                                 *
                                 * **Most users will never need to touch this property.**
                                 *
                                 * This  property should not be confused with the `render` instance method,
                                 * which should be overridden to define a template for the element.
                                 *
                                 * Advanced users creating a new base class based on LitElement can override
                                 * this property to point to a custom render method with a signature that
                                 * matches [shady-render's `render`
                                 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
                                 *
                                 * @nocollapse
                                 */LitElement.render=render$2;var litElement={LitElement:LitElement,defaultConverter:defaultConverter,notEqual:notEqual,UpdatingElement:UpdatingElement,customElement:customElement,property:property,internalProperty:internalProperty,query:query,queryAsync:queryAsync,queryAll:queryAll,eventOptions:eventOptions,queryAssignedNodes:queryAssignedNodes,html:html,svg:svg,TemplateResult:TemplateResult,SVGTemplateResult:SVGTemplateResult,supportsAdoptingStyleSheets:supportsAdoptingStyleSheets,CSSResult:CSSResult,unsafeCSS:unsafeCSS,css:css};_exports.$litElement=litElement;const selectionStyles=css`
  ::-moz-selection {
    color: var(--dark-gray);
    background: var(--aqua);
  }

  ::selection {
    color: var(--dark-gray);
    background: var(--aqua);
  }

  .highlight {
    color: var(--off-white);
    text-decoration: none;
  }
`;_exports.selectionStyles=selectionStyles;var selectionStyles$1={selectionStyles:selectionStyles};_exports.$selectionStyles=selectionStyles$1;class About extends LitElement{static get styles(){return[css`
        #about {
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: var(--subtitle);
        }

        p {
          margin-top: 0;
        }

        .title {
          font-size: var(--title);
          font-family: var(--main);
        }

        .link:hover {
          color: var(--aqua);
        }

        #contacts {
          display: grid;
          grid-template-columns: repeat(auto-fill, 7rem);
          row-gap: 0.5rem;

          margin-bottom: 5rem;
        }

        a {
          text-decoration: none;
          color: inherit;
          outline: none;
        }

        .contact {
          display: flex;
          border-radius: 5rem;
          background-color: var(--dark-gray);
          color: var(--light-gray);
          width: 5rem;
          height: 5rem;
          justify-content: center;
          align-items: center;
          margin: 1px;
        }

        .contact:hover {
          cursor: pointer;
          color: var(--off-white);
        }
        .contact:hover .tooltip {
          visibility: visible;
        }

        .contact .tooltip::before {
          position: absolute;
          left: calc(50% - 1rem);
          margin-top: -1.5rem;
          z-index: 1;
          height: 1rem;
          width: 1rem;
          background: var(--dark-gray);
          content: "";
          transform: translateX(50%) rotate(45deg) translateZ(5rem);
        }

        .contact .tooltip {
          visibility: hidden;
          background-color: var(--dark-gray);
          color: var(--off-white);
          text-align: center;
          font-family: var(--code);
          font-size: var(--tooltip);
          position: absolute;
          z-index: 1;
          padding: 1rem;
          border-radius: 5rem;
          transform: translateY(5rem);
        }

        fa-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
        }

        figure {
          width: 70rem;
          margin: 0;
        }
      `,selectionStyles]}render(){return html`
      <div id="about">
        <span class="title highlight">Hello.</span><br /><br />
        <p>
          I am a student developer studying at the
          <a
            href="https://www.utoronto.ca/"
            target="_blank"
            class="highlight link"
            >University of Toronto</a
          >
          in Canada. <br />
          Currently, I am working as a
          <a
            href="https://www.caseware.com/ca"
            target="_blank"
            class="highlight link"
            >Software Developer at CaseWare International</a
          >
          for my co-op term. <br />
          Let's connect. Reach out below! <br />
        </p>
        <div id="contacts">
          <a
            id="github"
            href="https://github.com/navn-r"
            target="_blank"
            class="contact"
          >
            <fa-icon class="fab fa-github"></fa-icon>
            <div class="tooltip">navn-r</div>
          </a>
          <a
            id="linkedin"
            href="https://linkedin.com/in/navinn-ravindaran"
            target="_blank"
            class="contact"
          >
            <fa-icon class="fab fa-linkedin"></fa-icon>
            <div class="tooltip">navinn-ravindaran</div>
          </a>
          <a
            id="email"
            href="mailto:me@navn.me"
            target="_blank"
            class="contact"
          >
            <fa-icon class="fas fa-paper-plane"></fa-icon>
            <div class="tooltip">me [at] navn [dot] me</div>
          </a>
          <a
            id="resume"
            href="https://utsc-utoronto-csm.symplicity.com/qr/4db0a409d04be0eebe62b63e9d0e1e4f?resume=73d14a30f47b13ade479e1689e2fd6ae&student=46b91eed6f460f44229377b0f6ec2264"
            target="_blank"
            class="contact"
          >
            <fa-icon class="fas fa-file-pdf"></fa-icon>
            <div class="tooltip">resume [dot] pdf</div>
          </a>
        </div>
        <!-- <typewriter-term></typewriter-term> -->
      </div>
    `}constructor(){super()}}customElements.define("about-section",About);class Carousel extends LitElement{static get styles(){return css`
      fa-icon {
        font-size: 5rem;
      }
      .button {
        background: none;
        border: 0;
        cursor: pointer;
        color: var(--light-gray);
        width: 3rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .button:hover {
        color: var(--off-white);
      }

      .slide {
        width: 100%;
        background-color: var(--gray);
        justify-content: center;
        display: flex;
        justify-content: center;
      }

      .slide > img {
        height: 100%;
      }

      .carousel {
        display: grid;
        grid-template-columns: 3rem 1fr 3rem;
      }

      .track {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        width: 100%;
        justify-content: center;
      }
    `}render(){return html`
      <div class="carousel">
        <button @click="${this.changeImgLeft}" class="button">
          <fa-icon class="fas fa-angle-left"></fa-icon>
        </button>
        <div class="track-container">
          <ul class="track"></ul>
        </div>
        <button @click="${this.changeImgRight}" class="button">
          <fa-icon class="fas fa-angle-right"></fa-icon>
        </button>
      </div>
    `}static get properties(){return{name:{type:String},length:{type:Number},current:{type:Number},width:{type:Number}}}firstUpdated(){const track=this.shadowRoot.querySelector("ul");let slide=document.createElement("li");slide.className="slide";let image=document.createElement("img");this.current=1;image.src=`Assets/projects/${this.name}/${this.name}-1.png`;image.width=this.width;slide.appendChild(image);track.appendChild(slide)}changeImgRight(e){let image=this.shadowRoot.querySelector("img");if(this.current===this.length)this.current=1;else this.current++;image.src=`Assets/projects/${this.name}/${this.name}-${this.current}.png`}changeImgLeft(){let image=this.shadowRoot.querySelector("img");if(1===this.current)this.current=this.length;else this.current--;image.src=`Assets/projects/${this.name}/${this.name}-${this.current}.png`}constructor(){super()}}customElements.define("image-carousel",Carousel);class ExperienceCard extends LitElement{static get styles(){return[css`
      .title {
        font-size: var(--subtitle);
      }

      .location {
        font-family: var(--code);
        background: var(--dark-gray);
        padding: 0.25rem;
      }

      .card {
        margin: 4rem  0;
      }
    `,selectionStyles]}render(){return html`
      <div class="card">
        <span class="title">${this.name}</span
        > <span class="title location">${this.location}</span>
        <slot name="body"></slot>
      </div>
    `}static get properties(){return{name:{type:String},location:{type:String}}}constructor(){super()}}customElements.define("experience-card",ExperienceCard);class Experiences extends LitElement{static get styles(){return[css`
        #experience-container {
          margin-bottom: 6rem;
        }

        ul {
          padding-left: 2rem;
        }

        .title {
          font-family: var(--main);
          font-size: var(--title);
          color: var(--off-white);
          margin-bottom: -2rem;
        }
      `,selectionStyles]}render(){return html`
    <div class="title">What I do.</div>
    <div id="experience-container">
        <experience-card name="Software Developer Co-op" location="@caseware">
          <div slot="body">
            Sept. 2020 - Present
            <ul>
                <li>Working in an <span class="highlight">Agile Scrum</span> on the <span class="highlight">Simple Engagements</span> product</li>
                <li>Converting manual tests to unit tests using <span class="highlight">Karma and Jasmine</span></li>
                <li>Developing bug fixes and features using <span class="highlight">Angular and AngularJS</span></li>
            </ul>
          </div>
        </experience-card>
        <experience-card name="HBSc. Computer Science (Co-op)" location="@uoft">
          <div slot="body">
            Sept. 2019 - Apr. 2023 (Expected)
            <ul>
                <li>cGPA: <span class="highlight">3.83</span>/4.0</li>
                <li>Dean's List (<span class="highlight">2019-20</span>)</li>
                <li>UofT Scholar (<span class="highlight">Sept 2019</span>)</li>
            </ul>
          </div>
        </experience-card>
    </div>`}constructor(){super()}}customElements.define("experiences-section",Experiences);class Header extends LitElement{static get styles(){return css`
      #header {
        width: 100%;
        height: 18rem;
        background-color: var(--dark-gray);
        user-select: none;
        -moz-user-select: none;
      }

      app-name {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -18rem;
      }

      @media (max-width: 1000px) {
        #header {
          height: 10rem;
        }

        app-name {
          margin-top: -10rem;
        }
      }
    `}render(){return html`
      <div id="header">
        <slot name="particles"></slot>
        <app-name></app-name>
      </div>
    `}firstUpdated(){particlesJS.load("particles","Assets/particles.json",function(){console.log("callback - particles.js config loaded")})}constructor(){super()}}customElements.define("app-header",Header);// Robert Penner's easeInOutQuad
// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js
var easeInOutQuad=function easeInOutQuad(t,b,c,d){t/=d/2;if(1>t)return c/2*t*t+b;t--;return-c/2*(t*(t-2)-1)+b},_typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"===typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},jumper=function jumper(){// private variable cache
// no variables are created during a jump, preventing memory leaks
var element=void 0,start=void 0,stop=void 0,offset=void 0,easing=void 0,a11y=void 0,distance=void 0,duration=void 0,timeStart=void 0,timeElapsed=void 0,next=void 0,callback=void 0;// element to scroll to                   (node)
// to call when done scrolling            (function)
// scroll position helper
function location(){return window.scrollY||window.pageYOffset}// element offset helper
function top(element){return element.getBoundingClientRect().top+start}// rAF loop helper
function loop(timeCurrent){// store time scroll started, if not started already
if(!timeStart){timeStart=timeCurrent}// determine time spent scrolling so far
timeElapsed=timeCurrent-timeStart;// calculate next scroll position
next=easing(timeElapsed,start,distance,duration);// scroll to it
window.scrollTo(0,next);// check progress
timeElapsed<duration?window.requestAnimationFrame(loop)// continue scroll loop
:done();// scrolling is done
}// scroll finished helper
function done(){// account for rAF time rounding inaccuracies
window.scrollTo(0,start+distance);// if scrolling to an element, and accessibility is enabled
if(element&&a11y){// add tabindex indicating programmatic focus
element.setAttribute("tabindex","-1");// focus the element
element.focus()}// if it exists, fire the callback
if("function"===typeof callback){callback()}// reset time for next jump
timeStart=!1}// API
function jump(target){var options=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{};// resolve options, or use defaults
duration=options.duration||1e3;offset=options.offset||0;callback=options.callback;// "undefined" is a suitable default, and won't be called
easing=options.easing||easeInOutQuad;a11y=options.a11y||!1;// cache starting position
start=location();// resolve target
switch("undefined"===typeof target?"undefined":_typeof(target)){// scroll from current position
case"number":element=void 0;// no element to scroll to
a11y=!1;// make sure accessibility is off
stop=start+target;break;// scroll to element (node)
// bounding rect is relative to the viewport
case"object":element=target;stop=top(element);break;// scroll to element (selector)
// bounding rect is relative to the viewport
case"string":element=document.querySelector(target);stop=top(element);break;}// resolve scroll distance, accounting for offset
distance=stop-start+offset;// resolve duration
switch(_typeof(options.duration)){// number in ms
case"number":duration=options.duration;break;// function passed the distance of the scroll
case"function":duration=options.duration(distance);break;}// start the loop
window.requestAnimationFrame(loop)}// expose only the jump method
return jump},singleton=jumper();_exports.$jumpModuleDefault=singleton;var jump_module={default:singleton};_exports.$jumpModule=jump_module;class Menu extends LitElement{static get styles(){return css`
      #button-container {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        row-gap: 1rem;
      }

      button {
        background-color: inherit;
        border: 0;
        font-size: 2rem;
        text-align: right;
        font-family: var(--main);
        outline: none;
        color: inherit;
      }

      .selected {
        color: var(--red);
      }

      .selected:hover {
        color: var(--red);
        cursor: initial;
      }

      button:hover {
        cursor: pointer;
        color: var(--red);
      }

      @media (max-width: 1000px) {
        #button-container {
          grid-template-rows: auto;
          grid-template-columns: repeat(3, 1fr);
        }

        button {
          text-align: center;
        }
      }

      @media (max-width: 600px) {
        button {
          font-size: 1.75rem;
        }
      }
    `}static get properties(){return{current:{type:String},scrollFunc:{attribute:!1}}}render(){return html`
      <div id="button-container">
        <button
          @click="${this.clickHandler}"
          class="${"about"===this.current?"selected":""}"
          id="about"
        >
          About
        </button>
        <button
          @click="${this.clickHandler}"
          class="${"experience"===this.current?"selected":""}"
          id="experience"
        >
          Experience
        </button>
        <button
          @click="${this.clickHandler}"
          class="${"projects"===this.current?"selected":""}"
          id="projects"
        >
          Projects
        </button>
      </div>
    `}firstUpdated(){window.addEventListener("scroll",this.scrollFunc,!0)}onScroll(){const scroll=window.scrollY,menus=["about","experience","projects"];menus.forEach(target=>{const section=document.getElementsByClassName(target)[0];let top=section.offsetTop;if(0>top)top=0;if("projects"===target)top-=15;if(top<=scroll&&top+section.offsetHeight>scroll)this.current=target;if(window.innerHeight+window.pageYOffset>=document.body.offsetHeight-20)this.current="projects"})}clickHandler(e){if(this.current===e.target.id)return;window.removeEventListener("scroll",this.scrollFunc,!0);this.current=e.target.id;singleton("."+this.current,{offset:"projects"===this.current?-15:0,callback:()=>{window.addEventListener("scroll",this.scrollFunc,!0)}})}constructor(){super();this.current="about";this.scrollFunc=()=>this.onScroll()}}customElements.define("app-menu",Menu);class Name extends LitElement{static get styles(){return css`
      #name {
        font-size: min(20vw, 8.5rem);
        -moz-user-select: none;
        -webkit-user-select: none;
        color: var(--light-gray);
        text-align: center;
      }

      .wiggle {
        transition: transform 0.5s ease-out;
      }

      .wiggle:hover {
        transform: rotate(20deg);
      }

      @media (max-width: 1000px) {
        #name {
          font-size: min(15vw, 5rem);
        }
      }
    `}render(){return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
        integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
        crossorigin="anonymous"
      />
      <div id="name"></div>
    `}constructor(){super()}firstUpdated(){const nameKatex=katex.renderToString("\\mathbb{N}\\textnormal{a}\\vec{v}_i\\textnormal{nn}",{throwOnError:!1});this.shadowRoot.getElementById("name").innerHTML+=nameKatex;const i=this.shadowRoot.getElementById("name").childNodes[0].childNodes[1].childNodes[0].childNodes[3].childNodes[1].childNodes[0];i.className+=" wiggle"}}customElements.define("app-name",Name);class ProjectCard extends LitElement{static get styles(){return[css`
        .subtitle {
          font-size: 2rem;
          width: 100%;
          color: var(--off-white);
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          width: 48rem;
          align-items: center;
        }

        a {
          color: var(--off-white);
          text-decoration: none;
          margin-left: 1rem;
        }

        .fa-github {
          font-size: 2.25rem;
        }

        a:hover {
          color: var(--aqua);
        }

        ::slotted(div) {
          margin-top: 2rem;
        }

        .card {
          margin-top: 2rem;
          padding-bottom: 3rem;
        }

        @media (max-width: 500px) {
          .subtitle {
            width: calc(100% - 2rem);
          }
        }
      `,selectionStyles]}render(){return html`
      <div class="card">
        <div class="subtitle">
          ${this.name}
          <div class="button-container">
            <a href="${this.github}" target="_blank"><fa-icon class="fab fa-github"></fa-icon></a
            >${this.demo?html`<a href="${this.demo}" target="_blank"
              ><fa-icon class="fas fa-external-link-alt"></fa-icon
            ></a>`:""}
          </div>
        </div>
        <slot name="description"></slot>
        <slot name="body"></slot>
      </div>
    `}static get properties(){return{name:{type:String},github:{type:String},demo:{type:String}}}constructor(){super()}}customElements.define("project-card",ProjectCard);class Projects extends LitElement{static get styles(){return[css`
        .title {
          font-family: var(--main);
          font-size: var(--title);
          color: var(--off-white);
        }

        ul {
          margin-top: 0.5rem;
        }

        li {
          margin-top: 0.5rem;
        }

        blockquote {
          border-left: 1rem solid var(--dark-gray);
          background-color: var(--light-dark-gray);
          margin: 0;
          padding: 1rem;
          width: 45rem;
        }

        .code {
          font-family: var(--code);
          font-size: 1.25rem;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          user-select: none;
          -moz-user-select: none;
          width: 45rem;
        }

        .tag {
          font-family: var(--code);
          font-size: 1rem;
          background: var(--dark-gray);
          padding: 0.75rem;
          margin: 0.25rem;
          border-radius: 0.5rem;
          width: max-content;
        }

        .project {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          justify-content: space-around;
        }

        @media (max-width: 500px) {
          blockquote {
            width: calc(100% - 5rem);
          }

          ul {
            padding-left: 2rem;
          }

          .tags-container {
            width: calc(100% - 3rem);
          }
        }
      `,selectionStyles]}render(){return html`
      <span class="title">What I've made.</span>
      <div id="projects-container">
      <project-card
          name="UImpactify"
          github="https://github.com/navn-r/uimpactify"
          demo="https://uimpactify.herokuapp.com"
        >
          <blockquote slot="description">
            The E-Learning website dedicated to serve the social purpose sector.
          </blockquote>
          <div slot="body">
            <ul>
                <li>Multiple User Types (Impact Learner, Impact Consultant, Social Initiatives)</li>
                <li>Course Creation and Enrollment</li>
                <li>Recorded Lectures and Graded Assessments</li>
                <li>Course Surveys & Ratings</li>
                <li>Student Analytics</li>
                <li>Realtime Chat</li>
                <li>Volunteer & Employment Opportunities</li>
                <li>Community Driven Donation System (Giving Garden)</li>
            </ul>
            <div class="tags-container">
              <div class="tag">MongoDB</div>
              <div class="tag">ExpressJS</div>
              <div class="tag">Angular</div>
              <div class="tag">Node.js</div>
              <div class="tag">Socket.io</div>
              <div class="tag">Chart.js</div>
              <div class="tag">Multer</div>
              <div class="tag">GridFS</div>
              <div class="tag">Figma</div>
              <div class="tag">Jira</div>
            </div>
          </div>
        </project-card>
        <project-card
          name="Spotify API Clone"
          github="https://github.com/navn-r/spotify-api-clone"
          demo="https://navn.me/spotify-api-clone"
        >
          <blockquote slot="description">
            A REST API for a social-centric music player using microservices.
          </blockquote>
          <div slot="body">
            <ul>
              <li>Create and follow/unfollow user profiles</li>
              <li>Upload and like/unlike songs</li>
              <li>Playlist generation based on liked songs</li>
              <li>Query liked songs based on followers</li>
            </ul>
            <div class="tags-container">
              <div class="tag">Java</div>
              <div class="tag">Spring Boot</div>
              <div class="tag">MongoDB</div>
              <div class="tag">Neo4j</div>
            </div>
          </div>
        </project-card>
        <project-card
          name="Ritrovo"
          github="https://github.com/navn-r/ritrovo"
          demo="https://ritrovo.herokuapp.com"
        >
          <blockquote slot="description">
            Meaning 'meeting place' in Italian, is a social platform.
          </blockquote>
          <div slot="body">
            <ul>
              <li>Single page, single community based design</li>
              <li>View all posts by other users</li>
              <li>Create, edit, and delete posts written in Markdown</li>
              <li>Built on the MEAN stack</li>
            </ul>
            <div class="tags-container">
              <div class="tag">MongoDB</div>
              <div class="tag">ExpressJS</div>
              <div class="tag">Angular</div>
              <div class="tag">Node.js</div>
              <div class="tag">TypeScript</div>
              <div class="tag">Markdown</div>
              <div class="tag">Bootstrap</div>
              <div class="tag">Heroku</div>
            </div>
          </div>
        </project-card>
        <project-card
          name="Standup Bot"
          github="https://github.com/navn-r/standup-bot"
        >
          <blockquote slot="description">
            A Discord bot used for Scrum daily standup meetings.
          </blockquote>
          <div slot="body">
            <ul>
              <li>
                Creates and faciliates a
                <span class="code">#daily-standups</span> text channel upon
                joining
              </li>
              <li>View, add and remove members in the standup</li>
              <li>Private DM triggering a standup prompt and response</li>
              <li>Present all member responses in a formatted message</li>
              <li>
                Be in multiple standups in different servers simultaneously
              </li>
            </ul>
            <div class="tags-container">
              <div class="tag">discord.js</div>
              <div class="tag">MongoDB</div>
              <div class="tag">Heroku</div>
              <div class="tag">Node.js</div>
            </div>
          </div>
        </project-card>
        <project-card
          name="Noten"
          github="https://github.com/navn-r/standup-bot"
          demo="https://ply.gl/com.noten"
        >
          <blockquote slot="description">
            Meaning 'grades' in German, is a cloud based grade management app.
          </blockquote>
          <div slot="body">
            <ul>
              <li>Basic Semester, Course, Catagory, Grade management</li>
              <li>Grade Prediction Calculator</li>
              <li>Pass/Fail Courses</li>
              <li>Multiple Grade Scales (5.0, 4.33, 4.0)</li>
              <li>Incognito Grades (ignored in GPA calculations)</li>
            </ul>
            <div class="tags-container">
              <div class="tag">React Native</div>
              <div class="tag">Google Sign-in</div>
              <div class="tag">Firebase Realtime Database</div>
            </div>
          </div>
        </project-card>
        <project-card name="Portfolio Website" github="https://github.com/navn-r/navn-r.github.io">
          <blockquote slot="description">
            Platform to showcase my projects and experiences.
          </blockquote>
          <div slot="body">
            <ul>
              <li>Fully responsive with CSS Grid</li>
              <li>Web components using lit-element, lit-html</li>
              <li>Automated build and deployment with TravisCI</li>
              <li>Purposefully built without a front-end framework</li>
            </ul>
            <div class="tags-container">
              <div class="tag">Web Components</div>
              <div class="tag">HTML</div>
              <div class="tag">CSS</div>
              <div class="tag">JavaScript</div>
            </div>
          </div></project-card
        >
      </div>
    `}constructor(){super()}}customElements.define("projects-section",Projects);class Terminal extends LitElement{static get styles(){return css`
      :host {
        /* Code Colors */
        /* --green: rgb(137, 202, 120);
        --blue: rgb(82, 173, 242);
        --red: rgb(239, 89, 111);
        --aqua: rgb(43, 186, 197);
        --yellow: rgb(229, 192, 123);
        --salmon: rgb(216, 152, 95); */
      }

      .term {
        padding: 1rem;
        margin-bottom: 1rem;
        color: var(--off-white);
        max-width: 70rem;
        border-radius: 5px;
        user-select: none;
        -webkit-user-select: none;
        border: 0.2rem var(--dark-gray) solid;
        /* filter: drop-shadow(0.25rem 0.25rem 0.1rem black); */
      }

      .dots {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.75rem;
      }

      .dot {
        height: 0.75rem;
        width: 0.75rem;
        margin-right: 0.5rem;
        border-radius: 50%;
        display: inline-block;
      }

      #term-type {
        /* animation: cursor-blink 0.9s infinite; */
        padding-right: 0.05rem;
        /* border-right: 0.1rem solid var(--off-white); */
        font-family: var(--code);
        line-height: 1.125;
        color: var(--aqua);
      }

      @keyframes cursor-blink {
        50% {
          border-color: transparent;
        }
      }

      #min {
        background-color: rgb(255, 188, 68);
      }
      #max {
        background-color: rgb(55, 200, 79);
      }
      #exit {
        background-color: rgb(254, 86, 82);
      }
    `}render(){return html`<div class="term">
      <div class="dots">
        <span class="dot" id="exit"></span>
        <span class="dot" id="min"></span>
        <span class="dot" id="max"></span>
      </div>
      <div id="term-text">
        <pre id="term-type"></pre>
        <!-- <font size="-3"> -->
<!-- <pre><font color=black>1000010100110011011010110</font><font color=#151515>1</font><font color=#626262>1</font><font color=#9e9e9e>1</font><font color=#b5b5b5>1</font><font color=#aeaeae>1</font><font color=#939393>0</font><font color=#757575>0</font><font color=#555555>1</font><font color=#313131>0</font><font color=#1c1c1c>1</font><font color=#0a0a0a>0</font><font color=black>100100010000100100010101</font><br><font color=black>111111101010111011000001001</font><font color=#030303>0</font><font color=#272727>0</font><font color=#6a6a6a>0</font><font color=#c2c2c2>0</font><font color=#fdfdfd>0</font><font color=white>0</font><font color=#fdfdfd>0</font><font color=#e9e9e9>1</font><font color=#cecece>1</font><font color=#aaaaaa>1</font><font color=#747474>0</font><font color=#3f3f3f>0</font><font color=#101010>1</font><font color=black>10101001001000110000</font><br><font color=black>110101100111010000110100000010</font><font color=#070707>0</font><font color=#373737>0</font><font color=#b4b4b4>1</font><font color=#fefefe>1</font><font color=white>0001</font><font color=#f9f9f9>0</font><font color=#eaeaea>1</font><font color=#b5b5b5>1</font><font color=#6d6d6d>0</font><font color=#202020>1</font><font color=#050505>1</font><font color=black>1101001100110000</font><br><font color=black>011101111011110011110001101001</font><font color=#020202>0</font><font color=#0b0b0b>0</font><font color=#242424>0</font><font color=#ebebeb>0</font><font color=white>11111000</font><font color=#f9f9f9>0</font><font color=#bbbbbb>0</font><font color=#5e5e5e>0</font><font color=#080808>1</font><font color=black>10010111001011</font><br><font color=black>01011000111100110000</font><font color=#0e0e0e>1</font><font color=#2e2e2e>0</font><font color=#4a4a4a>1</font><font color=#626262>0</font><font color=#7a7a7a>1</font><font color=#8b8b8b>1</font><font color=#9d9d9d>0</font><font color=#ababab>0</font><font color=#b7b7b7>0</font><font color=#c3c3c3>0</font><font color=#cfcfcf>0</font><font color=#d7d7d7>0</font><font color=#e9e9e9>0</font><font color=white>00100011010</font><font color=#fdfdfd>1</font><font color=#afafaf>1</font><font color=#111111>0</font><font color=black>0110001010011</font><br><font color=black>11001110000001</font><font color=#070707>0</font><font color=#1c1c1c>1</font><font color=#4a4a4a>1</font><font color=#828282>1</font><font color=#b3b3b3>0</font><font color=#e0e0e0>0</font><font color=#f8f8f8>1</font><font color=#fbfbfb>1</font><font color=#fdfdfd>0</font><font color=white>11011111010111111100100</font><font color=#c7c7c7>0</font><font color=#101010>0</font><font color=black>010111101100</font><br><font color=black>11110000001</font><font color=#050505>1</font><font color=#373737>1</font><font color=#7f7f7f>0</font><font color=#c3c3c3>0</font><font color=#f1f1f1>1</font><font color=white>0010</font><font color=#f4f4f4>0</font><font color=#dddddd>1</font><font color=#c8c8c8>0</font><font color=#b9b9b9>0</font><font color=#b0b0b0>0</font><font color=#a3a3a3>11</font><font color=#a4a4a4>0</font><font color=#b0b0b0>0</font><font color=#bbbbbb>1</font><font color=#cccccc>1</font><font color=#e0e0e0>0</font><font color=#fafafa>0</font><font color=white>00111000101000</font><font color=#a5a5a5>0</font><font color=#010101>0</font><font color=black>01101110100</font><br><font color=black>11101111</font><font color=#010101>0</font><font color=#121212>1</font><font color=#717171>0</font><font color=#cfcfcf>0</font><font color=#f6f6f6>0</font><font color=white>10</font><font color=#fbfbfb>0</font><font color=#e4e4e4>0</font><font color=#a5a5a5>1</font><font color=#6d6d6d>1</font><font color=#3a3a3a>0</font><font color=#1c1c1c>0</font><font color=#121212>1</font><font color=#090909>0</font><font color=#020202>1</font><font color=black>01000</font><font color=#030303>1</font><font color=#0a0a0a>0</font><font color=#131313>1</font><font color=#232323>1</font><font color=#4d4d4d>0</font><font color=#888888>1</font><font color=#cecece>0</font><font color=#fafafa>1</font><font color=white>0011011011</font><font color=#fcfcfc>0</font><font color=#333333>0</font><font color=black>011</font><font color=#010101>0</font><font color=black>1100100</font><br><font color=black>0000110</font><font color=#202020>1</font><font color=#8c8c8c>1</font><font color=#f0f0f0>1</font><font color=white>11</font><font color=#fcfcfc>0</font><font color=#d4d4d4>1</font><font color=gray>1</font><font color=#333333>0</font><font color=#020202>1</font><font color=black>0000001010111001011</font><font color=#2a2a2a>0</font><font color=#8b8b8b>1</font><font color=#eaeaea>1</font><font color=white>100100000</font><font color=#8b8b8b>1</font><font color=#050505>1</font><font color=#3b3b3b>1</font><font color=#939393>0</font><font color=#ababab>0</font><font color=#9a9a9a>1</font><font color=#5d5d5d>1</font><font color=#1c1c1c>1</font><font color=black>1111</font><br><font color=black>00101</font><font color=#040404>1</font><font color=#717171>0</font><font color=#e7e7e7>0</font><font color=white>010</font><font color=#bfbfbf>1</font><font color=#4f4f4f>0</font><font color=#0e0e0e>0</font><font color=black>111110111111101110100001</font><font color=#242424>1</font><font color=#b2b2b2>1</font><font color=white>00100011</font><font color=#e3e3e3>0</font><font color=#b6b6b6>1</font><font color=#f7f7f7>0</font><font color=white>0110</font><font color=#e6e6e6>0</font><font color=#7e7e7e>1</font><font color=#060606>0</font><font color=black>10</font><br><font color=black>0010</font><font color=#1b1b1b>1</font><font color=#bababa>0</font><font color=#fdfdfd>0</font><font color=white>00</font><font color=#dfdfdf>1</font><font color=#545454>0</font><font color=#060606>1</font><font color=black>00000110001011</font><font color=#010101>0</font><font color=#070707>01</font><font color=black>0001010011</font><font color=#060606>1</font><font color=#aeaeae>0</font><font color=white>101011100111111</font><font color=#fefefe>1</font><font color=#989898>0</font><font color=black>01</font><br><font color=black>101</font><font color=#212121>1</font><font color=#d4d4d4>0</font><font color=white>011</font><font color=#b5b5b5>0</font><font color=#191919>1</font><font color=black>111010000111101</font><font color=#0a0a0a>1</font><font color=#989898>1</font><font color=#c5c5c5>1</font><font color=#c3c3c3>1</font><font color=#878787>1</font><font color=#040404>0</font><font color=black>0</font><font color=#343434>1</font><font color=#8e8e8e>1</font><font color=#9b9b9b>0</font><font color=#7d7d7d>1</font><font color=#1a1a1a>1</font><font color=black>011</font><font color=#2c2c2c>0</font><font color=white>0010111100100000</font><font color=#fbfbfb>1</font><font color=#141414>0</font><font color=black>1</font><br><font color=black>11</font><font color=#0e0e0e>0</font><font color=#cfcfcf>1</font><font color=white>011</font><font color=#b0b0b0>1</font><font color=#0b0b0b>0</font><font color=black>10001011</font><font color=#212121>1</font><font color=#646464>1</font><font color=#464646>0</font><font color=black>01001</font><font color=#0c0c0c>1</font><font color=#b4b4b4>1</font><font color=#e8e8e8>0</font><font color=#e4e4e4>0</font><font color=#a1a1a1>1</font><font color=#050505>0</font><font color=black>1</font><font color=#898989>0</font><font color=#fefefe>1</font><font color=white>0</font><font color=#f7f7f7>1</font><font color=#4f4f4f>1</font><font color=black>101</font><font color=#191919>0</font><font color=white>01000011001000100</font><font color=#161616>1</font><font color=black>0</font><br><font color=black>11</font><font color=#9b9b9b>0</font><font color=white>100</font><font color=#dadada>0</font><font color=#0c0c0c>1</font><font color=black>0110010</font><font color=#141414>1</font><font color=#9d9d9d>0</font><font color=#fcfcfc>1</font><font color=white>1</font><font color=#fcfcfc>0</font><font color=#303030>1</font><font color=black>011110011011</font><font color=#121212>0</font><font color=#212121>0</font><font color=#0a0a0a>1</font><font color=black>0100</font><font color=#171717>1</font><font color=#fcfcfc>1</font><font color=white>100010000101110</font><font color=#bdbdbd>1</font><font color=black>00</font><br><font color=black>1</font><font color=#282828>0</font><font color=#f9f9f9>0</font><font color=white>001</font><font color=#595959>0</font><font color=black>0101001</font><font color=#0a0a0a>0</font><font color=#c4c4c4>1</font><font color=white>0011</font><font color=#b1b1b1>0</font><font color=#020202>1</font><font color=black>001010001001011010</font><font color=#040404>1</font><font color=#515151>0</font><font color=#8b8b8b>0</font><font color=#b2b2b2>1</font><font color=#d6d6d6>0</font><font color=#fdfdfd>1</font><font color=white>0101001001</font><font color=#f1f1f1>0</font><font color=#323232>1</font><font color=black>10</font><br><font color=black>0</font><font color=#7f7f7f>1</font><font color=white>0</font><font color=#f4f4f4>0</font><font color=#b9b9b9>0</font><font color=#6f6f6f>1</font><font color=#050505>0</font><font color=black>0001011</font><font color=#696969>1</font><font color=white>11111</font><font color=#fdfdfd>1</font><font color=#7a7a7a>1</font><font color=#040404>0</font><font color=black>01101110110010011100</font><font color=#020202>1</font><font color=#0c0c0c>1</font><font color=#878787>0</font><font color=white>111011110</font><font color=#f0f0f0>0</font><font color=#494949>0</font><font color=black>101</font><br><font color=black>0</font><font color=#8e8e8e>1</font><font color=#919191>1</font><font color=#232323>0</font><font color=black>1000101100</font><font color=#959595>0</font><font color=white>111111</font><font color=#fefefe>1</font><font color=#acacac>1</font><font color=#2b2b2b>1</font><font color=#010101>1</font><font color=black>1101001101011011111</font><font color=#2d2d2d>0</font><font color=#d8d8d8>0</font><font color=white>01110111</font><font color=#c9c9c9>0</font><font color=#2f2f2f>0</font><font color=black>0010</font><br><font color=black>1</font><font color=#0d0d0d>1</font><font color=black>110001100111</font><font color=#898989>1</font><font color=white>01100101</font><font color=#eeeeee>1</font><font color=#a9a9a9>1</font><font color=#4c4c4c>0</font><font color=#0c0c0c>0</font><font color=black>100100111011010</font><font color=#282828>0</font><font color=#868686>1</font><font color=#ebebeb>1</font><font color=white>0101010</font><font color=#e5e5e5>0</font><font color=#6f6f6f>0</font><font color=#0f0f0f>1</font><font color=black>10011</font><br><font color=black>01111010000101</font><font color=#333333>1</font><font color=#f9f9f9>0</font><font color=white>010100011</font><font color=#fdfdfd>1</font><font color=#f3f3f3>1</font><font color=silver>0</font><font color=#8d8d8d>0</font><font color=#616161>0</font><font color=#3f3f3f>0</font><font color=#262626>0</font><font color=#1d1d1d>0</font><font color=#1a1a1a>0</font><font color=#171717>1</font><font color=#1b1b1b>1</font><font color=#1d1d1d>1</font><font color=#2c2c2c>1</font><font color=#464646>1</font><font color=#6e6e6e>0</font><font color=#9a9a9a>1</font><font color=#d8d8d8>0</font><font color=#fafafa>1</font><font color=white>010010</font><font color=#f6f6f6>1</font><font color=#cccccc>0</font><font color=#666666>1</font><font color=#0b0b0b>1</font><font color=black>0000110</font><br><font color=black>011111100111001</font><font color=#888888>0</font><font color=white>101100111010000</font><font color=#fdfdfd>1</font><font color=#f6f6f6>0</font><font color=#f0f0f0>0</font><font color=#e8e8e8>0</font><font color=#f1f1f1>0</font><font color=#f7f7f7>0</font><font color=white>100101111</font><font color=#f5f5f5>0</font><font color=#c9c9c9>1</font><font color=#848484>1</font><font color=#373737>0</font><font color=#030303>0</font><font color=black>101001010</font><br><font color=black>000111000110111</font><font color=#070707>1</font><font color=#9a9a9a>0</font><font color=#fefefe>1</font><font color=white>101010000100001011100</font><font color=#fefefe>0</font><font color=#fcfcfc>1</font><font color=#f9f9f9>0</font><font color=#eaeaea>1</font><font color=#c1c1c1>0</font><font color=#8e8e8e>0</font><font color=#575757>0</font><font color=#222222>0</font><font color=#090909>1</font><font color=black>010000000111</font><br><font color=black>0000110111101110</font><font color=#010101>1</font><font color=#747474>1</font><font color=#f1f1f1>0</font><font color=white>1011101111101</font><font color=#fdfdfd>0</font><font color=#e8e8e8>0</font><font color=#d8d8d8>1</font><font color=#c8c8c8>0</font><font color=#adadad>1</font><font color=#959595>0</font><font color=#797979>1</font><font color=#5c5c5c>0</font><font color=#3e3e3e>1</font><font color=#1c1c1c>1</font><font color=#020202>0</font><font color=black>01011110100101000</font><br><font color=black>100001011010010110</font><font color=#343434>1</font><font color=#a8a8a8>0</font><font color=#f4f4f4>1</font><font color=white>10011010111</font><font color=#525252>1</font><font color=#1f1f1f>1</font><font color=#0c0c0c>1</font><font color=black>1010111100010111010000100</font><br><font color=black>0001000011011101000</font><font color=#030303>1</font><font color=#161616>1</font><font color=#545454>1</font><font color=#979797>0</font><font color=#d3d3d3>0</font><font color=#f0f0f0>0</font><font color=#fcfcfc>1</font><font color=white>001101</font><font color=#b6b6b6>0</font><font color=#323232>1</font><font color=#080808>0</font><font color=black>1010110011011110000001100</font><br><font color=black>00000111000100001011111</font><font color=#010101>0</font><font color=#1f1f1f>1</font><font color=#4c4c4c>1</font><font color=#7b7b7b>0</font><font color=#ababab>0</font><font color=#cdcdcd>1</font><font color=#e5e5e5>0</font><font color=#f9f9f9>1</font><font color=white>00</font><font color=#fbfbfb>0</font><font color=#c4c4c4>1</font><font color=#757575>1</font><font color=#2f2f2f>0</font><font color=#050505>0</font><font color=black>0010011011101100101010</font><br><font color=black>1110101000000110101010110011</font><font color=#0a0a0a>0</font><font color=#191919>1</font><font color=#272727>1</font><font color=#3e3e3e>1</font><font color=#5b5b5b>1</font><font color=#767676>1</font><font color=#8c8c8c>0</font><font color=#9f9f9f>0</font><font color=#a2a2a2>0</font><font color=#8b8b8b>1</font><font color=#464646>0</font><font color=#010101>0</font><font color=black>11101001001110110101</font><br>
</pre></font> -->
      </div>
    </div>`}constructor(){super()}firstUpdated(){const logo=`
                      .ohhs+:\`                     home@navn.me
                       \`/mMMMmy/.                  ---------------------------
                          /NMMMMMd+\`               OS: macOS Catalina 10.15.6 19G2021 x86_64
                           oMMMMMMMMy.             Host: MacBookPro15,4
                 \`:/osyhdmNMMMMMMMMMMN-            Kernel: 19.6.0
             -ohNMMMMMMMMMMMMMMMMMMMMMN.           Uptime: 19 years, 18 hours, 26 mins
          -sNMMMMMmhhyyyhmMMMMMMMMMMMMMh           Packages: 51 (brew)
        :dMMMNy+.          -+dMMMMMMMMMM.          Shell: zsh 5.7.1
      -dMMMd/                 -hMMMMMMMM+ +yy/     Resolution: 3840x2160, 3840x2160
     oMMMd:                     /MMMMMMMmmMMMMm-   DE: Aqua
    yMMMo                        +MMMMMMMMMMMMMN\`  WM: Rectangle
   yMMM/             -hds  +yo\`   NMMMMMMMMMMMMM/  Terminal: vscode
  +MMM+       .+.    -mNy \`NMM:   NMMMMMMMMMMMMM+  CPU: Intel i5-8257U (8) @ 1.40GHz
 \`NMMd       +MMd           .\`    NMMMMMMMMMMMMM.  GPU: Intel Iris Plus Graphics 645
 +MMM:      /MMMM:                :sdMMMMMMMMMMy   Memory: 6831MiB / 8192MiB
 dMm+       mMMMMm\`                  \`MMMMMMMMd\`  
 h:         MMMMMMm.                 oMMMMMMMd\`        
            NMMMMMMMy-             .yMMMMMMMo      Made with ♥
            yMMMMMMMMMmy+-.\` \`\`-/smMMMMMMMy.      
            .MMMMMMMMMMMMMMMMMMMMMMMMMMmo\`        
             /MMMMMMMMMMMMMMMMMMMMMNh+.           
              /MMMMMMMMMMMMMNdys+:\`               
               -dMMMMMMMMMd.                      
                 -odMMMMMMM+                      
                    \`/sdMMMMmo.                   
                         .:+oyyo.                 

`,text=this.shadowRoot.getElementById("term-type");text.innerText=logo}}customElements.define("typewriter-term",Terminal);class FaIcon extends LitElement{static get properties(){return{class:{type:String},style:{type:String}}}constructor(){super();this.class="";this.style=""}render(){return html`<link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
        crossorigin="anonymous"
      />
      <i class="${this.class} icon" style="${this.style}"></i>`}}_exports.FaIcon=FaIcon;customElements.define("fa-icon",FaIcon);var faIcon={FaIcon:FaIcon};/* -----------------------------------------------
   /* Author : Vincent Garreau  - vincentgarreau.com
   /* MIT license: http://opensource.org/licenses/MIT
   /* Demo / Generator : vincentgarreau.com/particles.js
   /* GitHub : github.com/VincentGarreau/particles.js
   /* How to use? : Check the GitHub README
   /* v2.0.0
   /* ----------------------------------------------- */_exports.$faIcon=faIcon;var pJS=function(tag_id,params){var canvas_el=document.querySelector("#"+tag_id+" > .particles-js-canvas-el");/* particles.js variables with default values */this.pJS={canvas:{el:canvas_el,w:canvas_el.offsetWidth,h:canvas_el.offsetHeight},particles:{number:{value:400,density:{enable:!0,value_area:800}},color:{value:"#fff"},shape:{type:"circle",stroke:{width:0,color:"#ff0000"},polygon:{nb_sides:5},image:{src:"",width:100,height:100}},opacity:{value:1,random:!1,anim:{enable:!1,speed:2,opacity_min:0,sync:!1}},size:{value:20,random:!1,anim:{enable:!1,speed:20,size_min:0,sync:!1}},line_linked:{enable:!0,distance:100,color:"#fff",opacity:1,width:1},move:{enable:!0,speed:2,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:3e3,rotateY:3e3}},array:[]},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:100,line_linked:{opacity:1}},bubble:{distance:200,size:80,duration:.4},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}},mouse:{}},retina_detect:!1,fn:{interact:{},modes:{},vendors:{}},tmp:{}};var pJS=this.pJS;/* params settings */if(params){Object.deepExtend(pJS,params)}pJS.tmp.obj={size_value:pJS.particles.size.value,size_anim_speed:pJS.particles.size.anim.speed,move_speed:pJS.particles.move.speed,line_linked_distance:pJS.particles.line_linked.distance,line_linked_width:pJS.particles.line_linked.width,mode_grab_distance:pJS.interactivity.modes.grab.distance,mode_bubble_distance:pJS.interactivity.modes.bubble.distance,mode_bubble_size:pJS.interactivity.modes.bubble.size,mode_repulse_distance:pJS.interactivity.modes.repulse.distance};pJS.fn.retinaInit=function(){if(pJS.retina_detect&&1<window.devicePixelRatio){pJS.canvas.pxratio=window.devicePixelRatio;pJS.tmp.retina=!0}else{pJS.canvas.pxratio=1;pJS.tmp.retina=!1}pJS.canvas.w=pJS.canvas.el.offsetWidth*pJS.canvas.pxratio;pJS.canvas.h=pJS.canvas.el.offsetHeight*pJS.canvas.pxratio;pJS.particles.size.value=pJS.tmp.obj.size_value*pJS.canvas.pxratio;pJS.particles.size.anim.speed=pJS.tmp.obj.size_anim_speed*pJS.canvas.pxratio;pJS.particles.move.speed=pJS.tmp.obj.move_speed*pJS.canvas.pxratio;pJS.particles.line_linked.distance=pJS.tmp.obj.line_linked_distance*pJS.canvas.pxratio;pJS.interactivity.modes.grab.distance=pJS.tmp.obj.mode_grab_distance*pJS.canvas.pxratio;pJS.interactivity.modes.bubble.distance=pJS.tmp.obj.mode_bubble_distance*pJS.canvas.pxratio;pJS.particles.line_linked.width=pJS.tmp.obj.line_linked_width*pJS.canvas.pxratio;pJS.interactivity.modes.bubble.size=pJS.tmp.obj.mode_bubble_size*pJS.canvas.pxratio;pJS.interactivity.modes.repulse.distance=pJS.tmp.obj.mode_repulse_distance*pJS.canvas.pxratio};/* ---------- pJS functions - canvas ------------ */pJS.fn.canvasInit=function(){pJS.canvas.ctx=pJS.canvas.el.getContext("2d")};pJS.fn.canvasSize=function(){pJS.canvas.el.width=pJS.canvas.w;pJS.canvas.el.height=pJS.canvas.h;if(pJS&&pJS.interactivity.events.resize){window.addEventListener("resize",function(){pJS.canvas.w=pJS.canvas.el.offsetWidth;pJS.canvas.h=pJS.canvas.el.offsetHeight;/* resize canvas */if(pJS.tmp.retina){pJS.canvas.w*=pJS.canvas.pxratio;pJS.canvas.h*=pJS.canvas.pxratio}pJS.canvas.el.width=pJS.canvas.w;pJS.canvas.el.height=pJS.canvas.h;/* repaint canvas on anim disabled */if(!pJS.particles.move.enable){pJS.fn.particlesEmpty();pJS.fn.particlesCreate();pJS.fn.particlesDraw();pJS.fn.vendors.densityAutoParticles()}/* density particles enabled */pJS.fn.vendors.densityAutoParticles()})}};pJS.fn.canvasPaint=function(){pJS.canvas.ctx.fillRect(0,0,pJS.canvas.w,pJS.canvas.h)};pJS.fn.canvasClear=function(){pJS.canvas.ctx.clearRect(0,0,pJS.canvas.w,pJS.canvas.h)};/* --------- pJS functions - particles ----------- */pJS.fn.particle=function(color,opacity,position){/* size */this.radius=(pJS.particles.size.random?Math.random():1)*pJS.particles.size.value;if(pJS.particles.size.anim.enable){this.size_status=!1;this.vs=pJS.particles.size.anim.speed/100;if(!pJS.particles.size.anim.sync){this.vs=this.vs*Math.random()}}/* position */this.x=position?position.x:Math.random()*pJS.canvas.w;this.y=position?position.y:Math.random()*pJS.canvas.h;/* check position  - into the canvas */if(this.x>pJS.canvas.w-2*this.radius)this.x=this.x-this.radius;else if(this.x<2*this.radius)this.x=this.x+this.radius;if(this.y>pJS.canvas.h-2*this.radius)this.y=this.y-this.radius;else if(this.y<2*this.radius)this.y=this.y+this.radius;/* check position - avoid overlap */if(pJS.particles.move.bounce){pJS.fn.vendors.checkOverlap(this,position)}/* color */this.color={};if("object"==typeof color.value){if(color.value instanceof Array){var color_selected=color.value[Math.floor(Math.random()*pJS.particles.color.value.length)];this.color.rgb=hexToRgb(color_selected)}else{if(color.value.r!=void 0&&color.value.g!=void 0&&color.value.b!=void 0){this.color.rgb={r:color.value.r,g:color.value.g,b:color.value.b}}if(color.value.h!=void 0&&color.value.s!=void 0&&color.value.l!=void 0){this.color.hsl={h:color.value.h,s:color.value.s,l:color.value.l}}}}else if("random"==color.value){this.color.rgb={r:Math.floor(Math.random()*(255-0+1))+0,g:Math.floor(Math.random()*(255-0+1))+0,b:Math.floor(Math.random()*(255-0+1))+0}}else if("string"==typeof color.value){this.color=color;this.color.rgb=hexToRgb(this.color.value)}/* opacity */this.opacity=(pJS.particles.opacity.random?Math.random():1)*pJS.particles.opacity.value;if(pJS.particles.opacity.anim.enable){this.opacity_status=!1;this.vo=pJS.particles.opacity.anim.speed/100;if(!pJS.particles.opacity.anim.sync){this.vo=this.vo*Math.random()}}/* animation - velocity for speed */var velbase={};switch(pJS.particles.move.direction){case"top":velbase={x:0,y:-1};break;case"top-right":velbase={x:.5,y:-.5};break;case"right":velbase={x:1,y:-0};break;case"bottom-right":velbase={x:.5,y:.5};break;case"bottom":velbase={x:0,y:1};break;case"bottom-left":velbase={x:-.5,y:1};break;case"left":velbase={x:-1,y:0};break;case"top-left":velbase={x:-.5,y:-.5};break;default:velbase={x:0,y:0};break;}if(pJS.particles.move.straight){this.vx=velbase.x;this.vy=velbase.y;if(pJS.particles.move.random){this.vx=this.vx*Math.random();this.vy=this.vy*Math.random()}}else{this.vx=velbase.x+Math.random()-.5;this.vy=velbase.y+Math.random()-.5}// var theta = 2.0 * Math.PI * Math.random();
// this.vx = Math.cos(theta);
// this.vy = Math.sin(theta);
this.vx_i=this.vx;this.vy_i=this.vy;/* if shape is image */var shape_type=pJS.particles.shape.type;if("object"==typeof shape_type){if(shape_type instanceof Array){var shape_selected=shape_type[Math.floor(Math.random()*shape_type.length)];this.shape=shape_selected}}else{this.shape=shape_type}if("image"==this.shape){var sh=pJS.particles.shape;this.img={src:sh.image.src,ratio:sh.image.width/sh.image.height};if(!this.img.ratio)this.img.ratio=1;if("svg"==pJS.tmp.img_type&&pJS.tmp.source_svg!=void 0){pJS.fn.vendors.createSvgImg(this);if(pJS.tmp.pushing){this.img.loaded=!1}}}};pJS.fn.particle.prototype.draw=function(){var p=this;if(p.radius_bubble!=void 0){var radius=p.radius_bubble}else{var radius=p.radius}if(p.opacity_bubble!=void 0){var opacity=p.opacity_bubble}else{var opacity=p.opacity}if(p.color.rgb){var color_value="rgba("+p.color.rgb.r+","+p.color.rgb.g+","+p.color.rgb.b+","+opacity+")"}else{var color_value="hsla("+p.color.hsl.h+","+p.color.hsl.s+"%,"+p.color.hsl.l+"%,"+opacity+")"}pJS.canvas.ctx.fillStyle=color_value;pJS.canvas.ctx.beginPath();switch(p.shape){case"circle":pJS.canvas.ctx.arc(p.x,p.y,radius,0,2*Math.PI,!1);break;case"edge":pJS.canvas.ctx.rect(p.x-radius,p.y-radius,2*radius,2*radius);break;case"triangle":pJS.fn.vendors.drawShape(pJS.canvas.ctx,p.x-radius,p.y+radius/1.66,2*radius,3,2);break;case"polygon":pJS.fn.vendors.drawShape(pJS.canvas.ctx,p.x-radius/(pJS.particles.shape.polygon.nb_sides/3.5),// startX
p.y-radius/(2.66/3.5),// startY
2.66*radius/(pJS.particles.shape.polygon.nb_sides/3),// sideLength
pJS.particles.shape.polygon.nb_sides,// sideCountNumerator
1// sideCountDenominator
);break;case"star":pJS.fn.vendors.drawShape(pJS.canvas.ctx,p.x-2*radius/(pJS.particles.shape.polygon.nb_sides/4),// startX
p.y-radius/(2.66*2/3.5),// startY
2.66*(2*radius)/(pJS.particles.shape.polygon.nb_sides/3),// sideLength
pJS.particles.shape.polygon.nb_sides,// sideCountNumerator
2// sideCountDenominator
);break;case"image":function draw(){pJS.canvas.ctx.drawImage(img_obj,p.x-radius,p.y-radius,2*radius,2*radius/p.img.ratio)}if("svg"==pJS.tmp.img_type){var img_obj=p.img.obj}else{var img_obj=pJS.tmp.img_obj}if(img_obj){draw()}break;}pJS.canvas.ctx.closePath();if(0<pJS.particles.shape.stroke.width){pJS.canvas.ctx.strokeStyle=pJS.particles.shape.stroke.color;pJS.canvas.ctx.lineWidth=pJS.particles.shape.stroke.width;pJS.canvas.ctx.stroke()}pJS.canvas.ctx.fill()};pJS.fn.particlesCreate=function(){for(var i=0;i<pJS.particles.number.value;i++){pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color,pJS.particles.opacity.value))}};pJS.fn.particlesUpdate=function(){for(var i=0,p;i<pJS.particles.array.length;i++){/* the particle */p=pJS.particles.array[i];// var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
// var f = -BANG_SIZE / d;
// if ( d < BANG_SIZE ) {
//     var t = Math.atan2( dy, dx );
//     p.vx = f * Math.cos(t);
//     p.vy = f * Math.sin(t);
// }
/* move the particle */if(pJS.particles.move.enable){var ms=pJS.particles.move.speed/2;p.x+=p.vx*ms;p.y+=p.vy*ms}/* change opacity status */if(pJS.particles.opacity.anim.enable){if(!0==p.opacity_status){if(p.opacity>=pJS.particles.opacity.value)p.opacity_status=!1;p.opacity+=p.vo}else{if(p.opacity<=pJS.particles.opacity.anim.opacity_min)p.opacity_status=!0;p.opacity-=p.vo}if(0>p.opacity)p.opacity=0}/* change size */if(pJS.particles.size.anim.enable){if(!0==p.size_status){if(p.radius>=pJS.particles.size.value)p.size_status=!1;p.radius+=p.vs}else{if(p.radius<=pJS.particles.size.anim.size_min)p.size_status=!0;p.radius-=p.vs}if(0>p.radius)p.radius=0}/* change particle position if it is out of canvas */if("bounce"==pJS.particles.move.out_mode){var new_pos={x_left:p.radius,x_right:pJS.canvas.w,y_top:p.radius,y_bottom:pJS.canvas.h}}else{var new_pos={x_left:-p.radius,x_right:pJS.canvas.w+p.radius,y_top:-p.radius,y_bottom:pJS.canvas.h+p.radius}}if(p.x-p.radius>pJS.canvas.w){p.x=new_pos.x_left;p.y=Math.random()*pJS.canvas.h}else if(0>p.x+p.radius){p.x=new_pos.x_right;p.y=Math.random()*pJS.canvas.h}if(p.y-p.radius>pJS.canvas.h){p.y=new_pos.y_top;p.x=Math.random()*pJS.canvas.w}else if(0>p.y+p.radius){p.y=new_pos.y_bottom;p.x=Math.random()*pJS.canvas.w}/* out of canvas modes */switch(pJS.particles.move.out_mode){case"bounce":if(p.x+p.radius>pJS.canvas.w)p.vx=-p.vx;else if(0>p.x-p.radius)p.vx=-p.vx;if(p.y+p.radius>pJS.canvas.h)p.vy=-p.vy;else if(0>p.y-p.radius)p.vy=-p.vy;break;}/* events */if(isInArray("grab",pJS.interactivity.events.onhover.mode)){pJS.fn.modes.grabParticle(p)}if(isInArray("bubble",pJS.interactivity.events.onhover.mode)||isInArray("bubble",pJS.interactivity.events.onclick.mode)){pJS.fn.modes.bubbleParticle(p)}if(isInArray("repulse",pJS.interactivity.events.onhover.mode)||isInArray("repulse",pJS.interactivity.events.onclick.mode)){pJS.fn.modes.repulseParticle(p)}/* interaction auto between particles */if(pJS.particles.line_linked.enable||pJS.particles.move.attract.enable){for(var j=i+1,p2;j<pJS.particles.array.length;j++){p2=pJS.particles.array[j];/* link particles */if(pJS.particles.line_linked.enable){pJS.fn.interact.linkParticles(p,p2)}/* attract particles */if(pJS.particles.move.attract.enable){pJS.fn.interact.attractParticles(p,p2)}/* bounce particles */if(pJS.particles.move.bounce){pJS.fn.interact.bounceParticles(p,p2)}}}}};pJS.fn.particlesDraw=function(){/* clear canvas */pJS.canvas.ctx.clearRect(0,0,pJS.canvas.w,pJS.canvas.h);/* update each particles param */pJS.fn.particlesUpdate();/* draw each particle */for(var i=0,p;i<pJS.particles.array.length;i++){p=pJS.particles.array[i];p.draw()}};pJS.fn.particlesEmpty=function(){pJS.particles.array=[]};pJS.fn.particlesRefresh=function(){/* init all */cancelRequestAnimFrame(pJS.fn.checkAnimFrame);cancelRequestAnimFrame(pJS.fn.drawAnimFrame);pJS.tmp.source_svg=void 0;pJS.tmp.img_obj=void 0;pJS.tmp.count_svg=0;pJS.fn.particlesEmpty();pJS.fn.canvasClear();/* restart */pJS.fn.vendors.start()};/* ---------- pJS functions - particles interaction ------------ */pJS.fn.interact.linkParticles=function(p1,p2){var dx=p1.x-p2.x,dy=p1.y-p2.y,dist=Math.sqrt(dx*dx+dy*dy);/* draw a line between p1 and p2 if the distance between them is under the config distance */if(dist<=pJS.particles.line_linked.distance){var opacity_line=pJS.particles.line_linked.opacity-dist/(1/pJS.particles.line_linked.opacity)/pJS.particles.line_linked.distance;if(0<opacity_line){/* style */var color_line=pJS.particles.line_linked.color_rgb_line;pJS.canvas.ctx.strokeStyle="rgba("+color_line.r+","+color_line.g+","+color_line.b+","+opacity_line+")";pJS.canvas.ctx.lineWidth=pJS.particles.line_linked.width;//pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
/* path */pJS.canvas.ctx.beginPath();pJS.canvas.ctx.moveTo(p1.x,p1.y);pJS.canvas.ctx.lineTo(p2.x,p2.y);pJS.canvas.ctx.stroke();pJS.canvas.ctx.closePath()}}};pJS.fn.interact.attractParticles=function(p1,p2){/* condensed particles */var dx=p1.x-p2.x,dy=p1.y-p2.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<=pJS.particles.line_linked.distance){var ax=dx/(1e3*pJS.particles.move.attract.rotateX),ay=dy/(1e3*pJS.particles.move.attract.rotateY);p1.vx-=ax;p1.vy-=ay;p2.vx+=ax;p2.vy+=ay}};pJS.fn.interact.bounceParticles=function(p1,p2){var dx=p1.x-p2.x,dy=p1.y-p2.y,dist=Math.sqrt(dx*dx+dy*dy),dist_p=p1.radius+p2.radius;if(dist<=dist_p){p1.vx=-p1.vx;p1.vy=-p1.vy;p2.vx=-p2.vx;p2.vy=-p2.vy}};/* ---------- pJS functions - modes events ------------ */pJS.fn.modes.pushParticles=function(nb,pos){pJS.tmp.pushing=!0;for(var i=0;i<nb;i++){pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color,pJS.particles.opacity.value,{x:pos?pos.pos_x:Math.random()*pJS.canvas.w,y:pos?pos.pos_y:Math.random()*pJS.canvas.h}));if(i==nb-1){if(!pJS.particles.move.enable){pJS.fn.particlesDraw()}pJS.tmp.pushing=!1}}};pJS.fn.modes.removeParticles=function(nb){pJS.particles.array.splice(0,nb);if(!pJS.particles.move.enable){pJS.fn.particlesDraw()}};pJS.fn.modes.bubbleParticle=function(p){/* on hover event */if(pJS.interactivity.events.onhover.enable&&isInArray("bubble",pJS.interactivity.events.onhover.mode)){var dx_mouse=p.x-pJS.interactivity.mouse.pos_x,dy_mouse=p.y-pJS.interactivity.mouse.pos_y,dist_mouse=Math.sqrt(dx_mouse*dx_mouse+dy_mouse*dy_mouse),ratio=1-dist_mouse/pJS.interactivity.modes.bubble.distance;function init(){p.opacity_bubble=p.opacity;p.radius_bubble=p.radius}/* mousemove - check ratio */if(dist_mouse<=pJS.interactivity.modes.bubble.distance){if(0<=ratio&&"mousemove"==pJS.interactivity.status){/* size */if(pJS.interactivity.modes.bubble.size!=pJS.particles.size.value){if(pJS.interactivity.modes.bubble.size>pJS.particles.size.value){var size=p.radius+pJS.interactivity.modes.bubble.size*ratio;if(0<=size){p.radius_bubble=size}}else{var dif=p.radius-pJS.interactivity.modes.bubble.size,size=p.radius-dif*ratio;if(0<size){p.radius_bubble=size}else{p.radius_bubble=0}}}/* opacity */if(pJS.interactivity.modes.bubble.opacity!=pJS.particles.opacity.value){if(pJS.interactivity.modes.bubble.opacity>pJS.particles.opacity.value){var opacity=pJS.interactivity.modes.bubble.opacity*ratio;if(opacity>p.opacity&&opacity<=pJS.interactivity.modes.bubble.opacity){p.opacity_bubble=opacity}}else{var opacity=p.opacity-(pJS.particles.opacity.value-pJS.interactivity.modes.bubble.opacity)*ratio;if(opacity<p.opacity&&opacity>=pJS.interactivity.modes.bubble.opacity){p.opacity_bubble=opacity}}}}}else{init()}/* mouseleave */if("mouseleave"==pJS.interactivity.status){init()}}/* on click event */else if(pJS.interactivity.events.onclick.enable&&isInArray("bubble",pJS.interactivity.events.onclick.mode)){if(pJS.tmp.bubble_clicking){var dx_mouse=p.x-pJS.interactivity.mouse.click_pos_x,dy_mouse=p.y-pJS.interactivity.mouse.click_pos_y,dist_mouse=Math.sqrt(dx_mouse*dx_mouse+dy_mouse*dy_mouse),time_spent=(new Date().getTime()-pJS.interactivity.mouse.click_time)/1e3;if(time_spent>pJS.interactivity.modes.bubble.duration){pJS.tmp.bubble_duration_end=!0}if(time_spent>2*pJS.interactivity.modes.bubble.duration){pJS.tmp.bubble_clicking=!1;pJS.tmp.bubble_duration_end=!1}}function process(bubble_param,particles_param,p_obj_bubble,p_obj,id){if(bubble_param!=particles_param){if(!pJS.tmp.bubble_duration_end){if(dist_mouse<=pJS.interactivity.modes.bubble.distance){if(p_obj_bubble!=void 0)var obj=p_obj_bubble;else var obj=p_obj;if(obj!=bubble_param){var value=p_obj-time_spent*(p_obj-bubble_param)/pJS.interactivity.modes.bubble.duration;if("size"==id)p.radius_bubble=value;if("opacity"==id)p.opacity_bubble=value}}else{if("size"==id)p.radius_bubble=void 0;if("opacity"==id)p.opacity_bubble=void 0}}else{if(p_obj_bubble!=void 0){var value_tmp=p_obj-time_spent*(p_obj-bubble_param)/pJS.interactivity.modes.bubble.duration,dif=bubble_param-value_tmp;value=bubble_param+dif;if("size"==id)p.radius_bubble=value;if("opacity"==id)p.opacity_bubble=value}}}}if(pJS.tmp.bubble_clicking){/* size */process(pJS.interactivity.modes.bubble.size,pJS.particles.size.value,p.radius_bubble,p.radius,"size");/* opacity */process(pJS.interactivity.modes.bubble.opacity,pJS.particles.opacity.value,p.opacity_bubble,p.opacity,"opacity")}}};pJS.fn.modes.repulseParticle=function(p){if(pJS.interactivity.events.onhover.enable&&isInArray("repulse",pJS.interactivity.events.onhover.mode)&&"mousemove"==pJS.interactivity.status){var dx_mouse=p.x-pJS.interactivity.mouse.pos_x,dy_mouse=p.y-pJS.interactivity.mouse.pos_y,dist_mouse=Math.sqrt(dx_mouse*dx_mouse+dy_mouse*dy_mouse),normVec={x:dx_mouse/dist_mouse,y:dy_mouse/dist_mouse},repulseRadius=pJS.interactivity.modes.repulse.distance,velocity=100,repulseFactor=clamp(1/repulseRadius*(-1*Math.pow(dist_mouse/repulseRadius,2)+1)*repulseRadius*velocity,0,50),pos={x:p.x+normVec.x*repulseFactor,y:p.y+normVec.y*repulseFactor};if("bounce"==pJS.particles.move.out_mode){if(0<pos.x-p.radius&&pos.x+p.radius<pJS.canvas.w)p.x=pos.x;if(0<pos.y-p.radius&&pos.y+p.radius<pJS.canvas.h)p.y=pos.y}else{p.x=pos.x;p.y=pos.y}}else if(pJS.interactivity.events.onclick.enable&&isInArray("repulse",pJS.interactivity.events.onclick.mode)){if(!pJS.tmp.repulse_finish){pJS.tmp.repulse_count++;if(pJS.tmp.repulse_count==pJS.particles.array.length){pJS.tmp.repulse_finish=!0}}if(pJS.tmp.repulse_clicking){var repulseRadius=Math.pow(pJS.interactivity.modes.repulse.distance/6,3),dx=pJS.interactivity.mouse.click_pos_x-p.x,dy=pJS.interactivity.mouse.click_pos_y-p.y,d=dx*dx+dy*dy,force=1*(-repulseRadius/d);function process(){var f=Math.atan2(dy,dx);p.vx=force*Math.cos(f);p.vy=force*Math.sin(f);if("bounce"==pJS.particles.move.out_mode){var pos={x:p.x+p.vx,y:p.y+p.vy};if(pos.x+p.radius>pJS.canvas.w)p.vx=-p.vx;else if(0>pos.x-p.radius)p.vx=-p.vx;if(pos.y+p.radius>pJS.canvas.h)p.vy=-p.vy;else if(0>pos.y-p.radius)p.vy=-p.vy}}// default
if(d<=repulseRadius){process()}// bang - slow motion mode
// if(!pJS.tmp.repulse_finish){
//   if(d <= repulseRadius){
//     process();
//   }
// }else{
//   process();
// }
}else{if(!1==pJS.tmp.repulse_clicking){p.vx=p.vx_i;p.vy=p.vy_i}}}};pJS.fn.modes.grabParticle=function(p){if(pJS.interactivity.events.onhover.enable&&"mousemove"==pJS.interactivity.status){var dx_mouse=p.x-pJS.interactivity.mouse.pos_x,dy_mouse=p.y-pJS.interactivity.mouse.pos_y,dist_mouse=Math.sqrt(dx_mouse*dx_mouse+dy_mouse*dy_mouse);/* draw a line between the cursor and the particle if the distance between them is under the config distance */if(dist_mouse<=pJS.interactivity.modes.grab.distance){var opacity_line=pJS.interactivity.modes.grab.line_linked.opacity-dist_mouse/(1/pJS.interactivity.modes.grab.line_linked.opacity)/pJS.interactivity.modes.grab.distance;if(0<opacity_line){/* style */var color_line=pJS.particles.line_linked.color_rgb_line;pJS.canvas.ctx.strokeStyle="rgba("+color_line.r+","+color_line.g+","+color_line.b+","+opacity_line+")";pJS.canvas.ctx.lineWidth=pJS.particles.line_linked.width;//pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
/* path */pJS.canvas.ctx.beginPath();pJS.canvas.ctx.moveTo(p.x,p.y);pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x,pJS.interactivity.mouse.pos_y);pJS.canvas.ctx.stroke();pJS.canvas.ctx.closePath()}}}};/* ---------- pJS functions - vendors ------------ */pJS.fn.vendors.eventsListeners=function(){/* events target element */if("window"==pJS.interactivity.detect_on){pJS.interactivity.el=window}else{pJS.interactivity.el=pJS.canvas.el}/* detect mouse pos - on hover / click event */if(pJS.interactivity.events.onhover.enable||pJS.interactivity.events.onclick.enable){/* el on mousemove */pJS.interactivity.el.addEventListener("mousemove",function(e){if(pJS.interactivity.el==window){var pos_x=e.clientX,pos_y=e.clientY}else{var pos_x=e.offsetX||e.clientX,pos_y=e.offsetY||e.clientY}pJS.interactivity.mouse.pos_x=pos_x;pJS.interactivity.mouse.pos_y=pos_y;if(pJS.tmp.retina){pJS.interactivity.mouse.pos_x*=pJS.canvas.pxratio;pJS.interactivity.mouse.pos_y*=pJS.canvas.pxratio}pJS.interactivity.status="mousemove"});/* el on onmouseleave */pJS.interactivity.el.addEventListener("mouseleave",function(e){pJS.interactivity.mouse.pos_x=null;pJS.interactivity.mouse.pos_y=null;pJS.interactivity.status="mouseleave"})}/* on click event */if(pJS.interactivity.events.onclick.enable){pJS.interactivity.el.addEventListener("click",function(){pJS.interactivity.mouse.click_pos_x=pJS.interactivity.mouse.pos_x;pJS.interactivity.mouse.click_pos_y=pJS.interactivity.mouse.pos_y;pJS.interactivity.mouse.click_time=new Date().getTime();if(pJS.interactivity.events.onclick.enable){switch(pJS.interactivity.events.onclick.mode){case"push":if(pJS.particles.move.enable){pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb,pJS.interactivity.mouse)}else{if(1==pJS.interactivity.modes.push.particles_nb){pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb,pJS.interactivity.mouse)}else if(1<pJS.interactivity.modes.push.particles_nb){pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb)}}break;case"remove":pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);break;case"bubble":pJS.tmp.bubble_clicking=!0;break;case"repulse":pJS.tmp.repulse_clicking=!0;pJS.tmp.repulse_count=0;pJS.tmp.repulse_finish=!1;setTimeout(function(){pJS.tmp.repulse_clicking=!1},1e3*pJS.interactivity.modes.repulse.duration);break;}}})}};pJS.fn.vendors.densityAutoParticles=function(){if(pJS.particles.number.density.enable){/* calc area */var area=pJS.canvas.el.width*pJS.canvas.el.height/1e3;if(pJS.tmp.retina){area=area/(2*pJS.canvas.pxratio)}/* calc number of particles based on density area */var nb_particles=area*pJS.particles.number.value/pJS.particles.number.density.value_area,missing_particles=pJS.particles.array.length-nb_particles;/* add or remove X particles */if(0>missing_particles)pJS.fn.modes.pushParticles(Math.abs(missing_particles));else pJS.fn.modes.removeParticles(missing_particles)}};pJS.fn.vendors.checkOverlap=function(p1,position){for(var i=0;i<pJS.particles.array.length;i++){var p2=pJS.particles.array[i],dx=p1.x-p2.x,dy=p1.y-p2.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<=p1.radius+p2.radius){p1.x=position?position.x:Math.random()*pJS.canvas.w;p1.y=position?position.y:Math.random()*pJS.canvas.h;pJS.fn.vendors.checkOverlap(p1)}}};pJS.fn.vendors.createSvgImg=function(p){/* set color to svg element */var svgXml=pJS.tmp.source_svg,rgbHex=/#([0-9A-F]{3,6})/gi,coloredSvgXml=svgXml.replace(rgbHex,function(m,r,g,b){if(p.color.rgb){var color_value="rgba("+p.color.rgb.r+","+p.color.rgb.g+","+p.color.rgb.b+","+p.opacity+")"}else{var color_value="hsla("+p.color.hsl.h+","+p.color.hsl.s+"%,"+p.color.hsl.l+"%,"+p.opacity+")"}return color_value}),svg=new Blob([coloredSvgXml],{type:"image/svg+xml;charset=utf-8"}),DOMURL=window.URL||window.webkitURL||window,url=DOMURL.createObjectURL(svg),img=new Image;/* prepare to create img with colored svg */img.addEventListener("load",function(){p.img.obj=img;p.img.loaded=!0;DOMURL.revokeObjectURL(url);pJS.tmp.count_svg++});img.src=url};pJS.fn.vendors.destroypJS=function(){cancelAnimationFrame(pJS.fn.drawAnimFrame);canvas_el.remove();pJSDom=null};pJS.fn.vendors.drawShape=function(c,startX,startY,sideLength,sideCountNumerator,sideCountDenominator){// By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
var sideCount=sideCountNumerator*sideCountDenominator,decimalSides=sideCountNumerator/sideCountDenominator,interiorAngleDegrees=180*(decimalSides-2)/decimalSides,interiorAngle=Math.PI-Math.PI*interiorAngleDegrees/180;// convert to radians
c.save();c.beginPath();c.translate(startX,startY);c.moveTo(0,0);for(var i=0;i<sideCount;i++){c.lineTo(sideLength,0);c.translate(sideLength,0);c.rotate(interiorAngle)}//c.stroke();
c.fill();c.restore()};pJS.fn.vendors.exportImg=function(){window.open(pJS.canvas.el.toDataURL("image/png"),"_blank")};pJS.fn.vendors.loadImg=function(type){pJS.tmp.img_error=void 0;if(""!=pJS.particles.shape.image.src){if("svg"==type){var xhr=new XMLHttpRequest;xhr.open("GET",pJS.particles.shape.image.src);xhr.onreadystatechange=function(data){if(4==xhr.readyState){if(200==xhr.status){pJS.tmp.source_svg=data.currentTarget.response;pJS.fn.vendors.checkBeforeDraw()}else{console.log("Error pJS - Image not found");pJS.tmp.img_error=!0}}};xhr.send()}else{var img=new Image;img.addEventListener("load",function(){pJS.tmp.img_obj=img;pJS.fn.vendors.checkBeforeDraw()});img.src=pJS.particles.shape.image.src}}else{console.log("Error pJS - No image.src");pJS.tmp.img_error=!0}};pJS.fn.vendors.draw=function(){if("image"==pJS.particles.shape.type){if("svg"==pJS.tmp.img_type){if(pJS.tmp.count_svg>=pJS.particles.number.value){pJS.fn.particlesDraw();if(!pJS.particles.move.enable)cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame=requestAnimFrame(pJS.fn.vendors.draw)}else{//console.log('still loading...');
if(!pJS.tmp.img_error)pJS.fn.drawAnimFrame=requestAnimFrame(pJS.fn.vendors.draw)}}else{if(pJS.tmp.img_obj!=void 0){pJS.fn.particlesDraw();if(!pJS.particles.move.enable)cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame=requestAnimFrame(pJS.fn.vendors.draw)}else{if(!pJS.tmp.img_error)pJS.fn.drawAnimFrame=requestAnimFrame(pJS.fn.vendors.draw)}}}else{pJS.fn.particlesDraw();if(!pJS.particles.move.enable)cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame=requestAnimFrame(pJS.fn.vendors.draw)}};pJS.fn.vendors.checkBeforeDraw=function(){// if shape is image
if("image"==pJS.particles.shape.type){if("svg"==pJS.tmp.img_type&&pJS.tmp.source_svg==void 0){pJS.tmp.checkAnimFrame=requestAnimFrame(check)}else{//console.log('images loaded! cancel check');
cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);if(!pJS.tmp.img_error){pJS.fn.vendors.init();pJS.fn.vendors.draw()}}}else{pJS.fn.vendors.init();pJS.fn.vendors.draw()}};pJS.fn.vendors.init=function(){/* init canvas + particles */pJS.fn.retinaInit();pJS.fn.canvasInit();pJS.fn.canvasSize();pJS.fn.canvasPaint();pJS.fn.particlesCreate();pJS.fn.vendors.densityAutoParticles();/* particles.line_linked - convert hex colors to rgb */pJS.particles.line_linked.color_rgb_line=hexToRgb(pJS.particles.line_linked.color)};pJS.fn.vendors.start=function(){if(isInArray("image",pJS.particles.shape.type)){pJS.tmp.img_type=pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length-3);pJS.fn.vendors.loadImg(pJS.tmp.img_type)}else{pJS.fn.vendors.checkBeforeDraw()}};/* ---------- pJS - start ------------ */pJS.fn.vendors.eventsListeners();pJS.fn.vendors.start()};/* ---------- global functions - vendors ------------ */Object.deepExtend=function deepExtendFunction(destination,source){for(var property in source){if(source[property]&&source[property].constructor&&source[property].constructor===Object){destination[property]=destination[property]||{};deepExtendFunction(destination[property],source[property])}else{destination[property]=source[property]}}return destination};window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)}}();window.cancelRequestAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout}();function hexToRgb(hex){// By Tim Down - http://stackoverflow.com/a/5624139/3493650
// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
var shorthandRegex=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;hex=hex.replace(shorthandRegex,function(m,r,g,b){return r+r+g+g+b+b});var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return result?{r:parseInt(result[1],16),g:parseInt(result[2],16),b:parseInt(result[3],16)}:null};function clamp(number,min,max){return Math.min(Math.max(number,min),max)};function isInArray(value,array){return-1<array.indexOf(value)}/* ---------- particles.js functions - start ------------ */window.pJSDom=[];window.particlesJS=function(tag_id,params){//console.log(params);
/* no string id? so it's object params, and set the id with default id */if("string"!=typeof tag_id){params=tag_id;tag_id="particles-js"}/* no id? set the id to default id */if(!tag_id){tag_id="particles-js"}/* pJS elements */var pJS_tag=document.getElementById(tag_id),pJS_canvas_class="particles-js-canvas-el",exist_canvas=pJS_tag.getElementsByClassName(pJS_canvas_class);/* remove canvas if exists into the pJS target tag */if(exist_canvas.length){while(0<exist_canvas.length){pJS_tag.removeChild(exist_canvas[0])}}/* create canvas element */var canvas_el=document.createElement("canvas");canvas_el.className=pJS_canvas_class;/* set size canvas */canvas_el.style.width="100%";canvas_el.style.height="100%";/* append canvas */var canvas=document.getElementById(tag_id).appendChild(canvas_el);/* launch particle.js */if(null!=canvas){pJSDom.push(new pJS(tag_id,params))}};window.particlesJS.load=function(tag_id,path_config_json,callback){/* load json config */var xhr=new XMLHttpRequest;xhr.open("GET",path_config_json);xhr.onreadystatechange=function(data){if(4==xhr.readyState){if(200==xhr.status){var params=JSON.parse(data.currentTarget.response);window.particlesJS(tag_id,params);if(callback)callback()}else{console.log("Error pJS - XMLHttpRequest status: "+xhr.status);console.log("Error pJS - File config not found")}}};xhr.send()}});
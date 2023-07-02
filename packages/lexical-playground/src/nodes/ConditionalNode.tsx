/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {EditorConfig, LexicalNode, NodeKey, TextNode} from 'lexical';

export class ConditionalNode extends TextNode {
  __color: string;

  constructor(text: string, color: string, key?: NodeKey) {
    super(text, key);
    this.__color = color;
  }

  static getType(): string {
    return 'colored';
  }

  static clone(node: ConditionalNode): ConditionalNode {
    return new ConditionalNode(node.__text, node.__color, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    element.style.color = this.__color;
    return element;
  }

  updateDOM(
    prevNode: ConditionalNode,
    dom: HTMLElement,
    config: EditorConfig,
  ): boolean {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    if (prevNode.__color !== this.__color) {
      dom.style.color = this.__color;
    }
    return isUpdated;
  }
}

export function $createColoredNode(
  text: string,
  color: string,
): ConditionalNode {
  return new ConditionalNode(text, color);
}

export function $isColoredNode(
  node: LexicalNode | null | undefined,
): node is ConditionalNode {
  return node instanceof ConditionalNode;
}

import { Reaction } from '../mobx.js';
import { LitElement } from '../lit-element.js';

/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const reaction = Symbol('LitMobxRenderReaction');
const cachedRequestUpdate = Symbol('LitMobxRequestUpdate');
const cachedPerformUpdate = Symbol('LitMobxPerformUpdate');
/**
 * A class mixin which can be applied to lit-element's
 * [UpdatingElement](https://lit-element.polymer-project.org/api/classes/_lib_updating_element_.updatingelement.html)
 * derived classes. This mixin adds a mobx reaction which tracks the update method of UpdatingElement.
 *
 * Any observables used in the render template of the element will be tracked by a reaction
 * and cause an update of the element upon change.
 *
 * @param constructor the constructor to extend from to add the mobx reaction, must be derived from UpdatingElement.
 */
function MobxReactionUpdate(constructor) {
    var _a, _b, _c;
    return _c = class MobxReactingElement extends constructor {
            constructor() {
                super(...arguments);
                this[_a] = () => this.requestUpdate();
                this[_b] = () => super.performUpdate();
            }
            connectedCallback() {
                super.connectedCallback();
                /* istanbul ignore next */
                const name = this.constructor.name || this.nodeName;
                this[reaction] = new Reaction(`${name}.update()`, this[cachedRequestUpdate]);
                if (this.hasUpdated)
                    this.requestUpdate();
            }
            disconnectedCallback() {
                super.disconnectedCallback();
                /* istanbul ignore else */
                if (this[reaction]) {
                    this[reaction].dispose();
                    this[reaction] = undefined;
                }
            }
            performUpdate() {
                if (this[reaction]) {
                    this[reaction].track(this[cachedPerformUpdate]);
                }
                else {
                    super.performUpdate();
                }
            }
        },
        _a = cachedRequestUpdate,
        _b = cachedPerformUpdate,
        _c;
}

/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * A LitElement derived class which uses the MobxReactionUpdate mixin to create a mobx
 * reactive implementation of LitElement.
 *
 * Any observables used in the render template of the element will be tracked by a reaction
 * and cause an update of the element upon change.
 */
class MobxLitElement extends MobxReactionUpdate(LitElement) {
}

export { MobxLitElement, MobxReactionUpdate };

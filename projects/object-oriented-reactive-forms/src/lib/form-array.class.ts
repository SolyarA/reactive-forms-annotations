import * as angularForms from '@angular/forms';
import { BehaviorFn } from './behaviors';
import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export class FormArray<T extends AbstractControl> extends angularForms.FormArray implements Iterable<T> {
  behaviors: BehaviorFn;

  constructor(
    controls: AbstractControl[],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
    behaviors?: BehaviorFn | BehaviorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
    this.behaviors = this._reduceBehaviors(behaviors);
  }

  * [Symbol.iterator](): Iterator<T> {
    for (const control of this.controls) {
      yield control as T;
    }
  }

  public at(index: number): T {
    return super.at(index) as T;
  }

  setBehaviors(behaviors: BehaviorFn | BehaviorFn[] | null) {
    this.behaviors = this._reduceBehaviors(behaviors);
  }

  updateValueAndValidity(opts: { onlySelf?: boolean, emitEvent?: boolean } = {}): void {
    super.updateValueAndValidity(opts);

    if (this.enabled && this.behaviors) {
      let parent = this.parent;

      while (parent && parent.parent) {
        parent = this.parent;
      }

      if (parent) {
        this.behaviors(this, parent);
      }
    }
  }

  private _reduceBehaviors(behaviors: BehaviorFn | BehaviorFn[] | null): BehaviorFn {
    if (Array.isArray(behaviors)) {
      return (abstractControl: AbstractControl, form): void => {
        behaviors.map(behavior => behavior(abstractControl, form));
      };
    } else {
      return behaviors;
    }
  }
}

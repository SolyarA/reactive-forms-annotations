import * as angularForms from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { AbstractControlOptions } from '@angular/forms';
import { BehaviorFn } from './behaviors';

export class FormGroup extends angularForms.FormGroup {
  behaviors: BehaviorFn;

  constructor(validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
              behaviors?: BehaviorFn | BehaviorFn[] | null
  ) {
    super({}, validatorOrOpts, asyncValidator);
    this.behaviors = this._reduceBehaviors(behaviors);
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

import { ValidatorFn } from '@angular/forms';
import 'reflect-metadata';
import { FormArray } from '../form-array.class';
import { BehaviorFn } from '../behaviors';
import { AbstractControlType, MetadataKey } from './metadata-key.enum';

export function formArray(validators?: ValidatorFn[], behaviors?: BehaviorFn | BehaviorFn[]): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) => {

    Reflect.defineMetadata(MetadataKey.AbstractControlValidators, validators, target, propertyKey);
    Reflect.defineMetadata(MetadataKey.AbstractControlBehaviors, behaviors, target, propertyKey);
    Reflect.defineMetadata(MetadataKey.AbstractControlType, AbstractControlType.FormArray, target, propertyKey);

    const getter = function() {
      return this[MetadataKey.AbstractControlPrefix + propertyKey];
    };

    const setter = function(newVal) {
      if (!this[MetadataKey.AbstractControlPrefix + propertyKey]) {
        const controlValidators = Reflect.getMetadata(MetadataKey.AbstractControlValidators, target, propertyKey);
        const controlBehaviors = Reflect.getMetadata(MetadataKey.AbstractControlBehaviors, target, propertyKey);
        this[MetadataKey.AbstractControlPrefix + propertyKey] = new FormArray<any>(newVal, controlValidators, null, controlBehaviors);
      } else {
        const array = this[MetadataKey.AbstractControlPrefix + propertyKey] as FormArray<any>;
        array.reset(null, {emitEvent: false});

        for (const control of newVal) {
          array.push(control);
        }
      }
    };

    if (delete target[propertyKey]) {

      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
  };
}

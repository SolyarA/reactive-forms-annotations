import { ValidatorFn } from '@angular/forms';
import 'reflect-metadata';
import { BehaviorFn } from '../behaviors';
import { FormControl } from '../form-control.class';
import { AbstractControlType, MetadataKey } from './metadata-key.enum';

export function formControl(validators?: ValidatorFn[], behaviors?: BehaviorFn[]): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(MetadataKey.AbstractControlValidators, validators, target, propertyKey);
    Reflect.defineMetadata(MetadataKey.AbstractControlBehaviors, behaviors, target, propertyKey);
    Reflect.defineMetadata(MetadataKey.AbstractControlType, AbstractControlType.FormControl, target, propertyKey);

    const getter = function() {
      return this[MetadataKey.AbstractControlPrefix + propertyKey];
    };

    const setter = function(newVal) {
      if (!this[MetadataKey.AbstractControlPrefix + propertyKey]) {
        const controlValidators = Reflect.getMetadata(MetadataKey.AbstractControlValidators, target, propertyKey);
        const controlBehaviors = Reflect.getMetadata(MetadataKey.AbstractControlBehaviors, target, propertyKey);
        this[MetadataKey.AbstractControlPrefix + propertyKey] = new FormControl(newVal, controlValidators, null, controlBehaviors);
      }

      const control = this[MetadataKey.AbstractControlPrefix + propertyKey] as FormControl;
      control.setValue(newVal);
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

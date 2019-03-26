import { ValidatorFn } from '@angular/forms';
import { BehaviorFn } from '../behaviors';
import { AbstractControlType, MetadataKey } from './metadata-key.enum';

export function formGroup(type, validators?: ValidatorFn[], behaviors?: BehaviorFn[]): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) => {

    Reflect.defineMetadata(MetadataKey.FormGroupTypeConstructor, type, target, propertyKey);
    Reflect.defineMetadata(MetadataKey.AbstractControlType, AbstractControlType.FormGroup, target, propertyKey);

    const getter = function() {
      return this[MetadataKey.AbstractControlPrefix + propertyKey];
    };

    const setter =  function(newVal) {
      this[MetadataKey.AbstractControlPrefix + propertyKey] = newVal;
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

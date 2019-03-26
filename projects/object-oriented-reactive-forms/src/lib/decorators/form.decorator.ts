import { AbstractControl } from '@angular/forms';
import { FormGroup } from '../form-group.class';
import { AbstractControlType, MetadataKey } from './metadata-key.enum';
import { FormControl } from '../form-control.class';
import { FormArray } from '../form-array.class';

export function form(target: any) {
  const original = target;

  function construct(constructor, args) {
    const c: any = function() {
      return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    return new c();
  }

  const f: any = (...args) => {

    const fromGroup = construct(target, args) as FormGroup;

    for (const propertyName of Object.keys(target.prototype)) {
      if (!fromGroup[propertyName]) {
        const controlValidators = Reflect.getMetadata(MetadataKey.AbstractControlValidators, fromGroup, propertyName);
        const controlBehaviors = Reflect.getMetadata(MetadataKey.AbstractControlBehaviors, fromGroup, propertyName);

        switch (Reflect.getMetadata(MetadataKey.AbstractControlType, fromGroup, propertyName)) {
          case AbstractControlType.FormArray:
            fromGroup[MetadataKey.AbstractControlPrefix + propertyName] = new FormArray<any>([], controlValidators, null, controlBehaviors);
            break;
          case AbstractControlType.FormControl:
            fromGroup[MetadataKey.AbstractControlPrefix + propertyName] = new FormControl(null, controlValidators, null, controlBehaviors);
            break;
          case AbstractControlType.FormGroup:
            const type = Reflect.getMetadata(MetadataKey.FormGroupTypeConstructor, fromGroup, propertyName);
            fromGroup[MetadataKey.AbstractControlPrefix + propertyName] = new type();
            break;
          default:
        }
      }

      if (fromGroup[MetadataKey.AbstractControlPrefix + propertyName]) {
        fromGroup.addControl(propertyName, fromGroup[MetadataKey.AbstractControlPrefix + propertyName]);
      }
    }

    return fromGroup;
  };

  f.prototype = original.prototype;

  return f;
}

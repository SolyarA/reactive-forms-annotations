import { AbstractControl, FormGroup } from '@angular/forms';
import { FormControl } from './form-control.class';
import { FormArray } from './form-array.class';

type FormControlType<T> = T & (T extends FormGroup ? FormGroup : FormControl);

export type TypeString = FormControlType<string>;
export type TypeNumber = FormControlType<number>;
export type TypeBoolean = FormControlType<boolean>;
export type TypeArray<T extends AbstractControl> = Array<T> & FormArray<T>;
export type Type<T> = FormControlType<T>;

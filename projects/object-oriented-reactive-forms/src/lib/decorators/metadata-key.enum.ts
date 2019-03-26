export enum MetadataKey {
  AbstractControlValidators = 'metadata:abstractControlValidators',
  AbstractControlBehaviors = 'metadata:abstractControlBehaviors',
  AbstractControlType = 'metadata:abstractControlType',
  FormGroupTypeConstructor = 'metadata:formGroupTypeConstructor',
  AbstractControlPrefix = '_oorf',
}

export enum AbstractControlType {
  FormControl = 0,
  FormArray = 1,
  FormGroup = 2
}

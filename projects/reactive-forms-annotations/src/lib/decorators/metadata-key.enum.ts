export enum MetadataKey {
  AbstractControlValidators = 'metadata:abstractControlValidators',
  AbstractControlBehaviors = 'metadata:abstractControlBehaviors',
  AbstractControlType = 'metadata:abstractControlType',
  DesingType = 'design:type',
  AbstractControlPrefix = '_rfa',
}

export enum AbstractControlType {
  FormControl = 0,
  FormArray = 1,
  FormGroup = 2
}

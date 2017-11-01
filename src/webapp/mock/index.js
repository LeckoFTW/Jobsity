const attributes = [
  {
    _id: "59ee8907e078a22546567dde",
    name: "Name",
    description: "Name for the device as provided by the user",
    dataType: "STRING",
    format: "NONE",
    category: "DEVICE INFO",
    enumerations: [
      "asd",
      "dsa"
    ],
    min: null,
    max: null,
    unitOfMeasurement: null,
    precision: null,
    accuracy: null,
    defaultValue: "Jhon Doe",
    device: ""
  },
  {
    _id: "59eec73c4ea3dc2584b2337d",
    name: "Location",
    description: "Location provided by the user",
    dataType: "STRING",
    format: "NUMBER",
    category: "DEVICE INFO",
    enumerations: [],
    min: 0,
    max: 10,
    unitOfMeasurement: "mm",
    precision: 2,
    accuracy: 5,
    defaultValue: "",
    device: ""
  }
];

const misc = {
  dataTypes: [ 'STRING', 'OBJECT' ],
  categories: [
    'DEVICE INFO',
    'SENSORS',
    'SETTINGS',
    'COMMANDS',
    'METADATA'
  ],
  formats: [
    'NONE',
    'NUMBER',
    'BOOLEAN',
    'DATE-TIME',
    'CDATA',
    'URI'
  ]
};

export default {
  attributes,
  misc
}

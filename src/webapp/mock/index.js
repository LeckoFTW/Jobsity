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
    dataTypes : ['STRING','OBJECT'],
    categories : [
        {
            _id : 'DEVICE INFO',
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet fermentum nisl, ut volutpat ipsum. Sed sapien nisl, molestie a blandit ac, viverra et libero. Aenean vulputate vehicula lacus, at elementum nisi congue blandit. Etiam tristique eros in augue scelerisque iaculis. Nullam nec enim ut ipsum tristique pulvinar id a sapien. Nullam in aliquam dui. Pellentesque gravida nulla vel purus auctor, ac pretium nibh pharetra. Maecenas bibendum luctus urna, at tincidunt quam. Morbi non feugiat tortor. Aenean vulputate egestas mauris, id finibus sem dictum at. Quisque magna tortor, vulputate nec lorem in, fermentum fermentum nulla.'
        },
        {
            _id : 'SENSORS',
            description : 'Duis nisl magna, placerat pellentesque enim non, aliquam dignissim odio. Aenean venenatis ante fringilla lectus aliquam lobortis. Donec eros quam, malesuada vitae dapibus a, dignissim in enim. Nulla vel rutrum est. Ut et neque eget metus gravida egestas ac id massa. Etiam in libero sed nibh lacinia varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed egestas metus leo, vel varius nulla sollicitudin quis. Vestibulum egestas ornare mollis. Cras lorem odio, vehicula eget laoreet id, placerat a dui. Sed vel aliquet neque. Aliquam eu tristique ex. Nulla quis orci a mi ultricies auctor eu quis libero.'
        },
        {
            _id : 'SETTINGS',
            description : 'Cras lacinia fringilla tellus, et blandit nisl vulputate eu. Donec odio mauris, sodales non placerat in, rhoncus eu ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pellentesque augue ut urna fringilla molestie. Nunc id tortor tempus eros vulputate efficitur a in sem. Sed eu tortor sed ex fermentum feugiat id nec dolor. Suspendisse id enim libero. Cras mollis urna quis consectetur interdum. Praesent blandit porttitor dui. Morbi vulputate sem id lacus rutrum efficitur. Praesent non iaculis neque.'
        },
        {
            _id : 'COMMANDS',
            description : 'Aliquam iaculis malesuada vulputate. Ut sit amet ligula consequat, sollicitudin urna a, tincidunt sapien. Pellentesque vitae consectetur nisi. Pellentesque eu nibh ornare, scelerisque sem vitae, facilisis orci. Nulla quis porta est, vel lacinia velit. Vestibulum scelerisque porta velit vel porta. Suspendisse potenti. Phasellus interdum commodo sagittis. Maecenas fringilla eu tortor venenatis ullamcorper.'
        },
        {
            _id : 'METADATA',
            description : 'Morbi rutrum maximus aliquet. Proin dictum nibh nisi, ut aliquam erat venenatis aliquet. Sed accumsan tempus ultricies. Maecenas tincidunt ante non ante commodo fermentum. Praesent facilisis congue nibh vel auctor. Phasellus cursus justo at tincidunt elementum. Nunc rhoncus convallis augue, pharetra pulvinar nunc euismod id. Vestibulum a porta mauris, ut euismod dui. Cras massa justo, vestibulum quis sollicitudin a, ultrices tempus felis.'
        }
    ],
    formats : [
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
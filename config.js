

var config={

    'host':'localhost',

    'port':27017,

    'dbName':'chatroom',
    
    'dburl':'mongodb://localhost:27017/chatroom',

    'c1':'users',
    'c2':'groups',
    'c3':'gprecords',
    
    'c1_input':[
        {
            'userId':001,
            'user':"Alice",
            'gpin':[001,004],
            'gpown':[001]
        },
        {
            'userId':002,
            'user':"Bob",
            'gpin':[001,002],
            'gpown':[002]
        },
        {
            'userId':003,
            'user':"Charlie",
            'gpin':[002,003],
            'gpown':[003]
        },
        {
            'userId':004,
            'user':"David",
            'gpin':[001,002,003,004],
            'gpown':[004]
        }        
    ],

    'c2_input':[
        {
            'groupId':001,
            'owner':"Alice",
            'person':["Alice","Bob","David"]
        },
        {
            'groupId':002,
            'owner':"Bob",
            'person':["Bob","David","Charlie"]
        },
        {
            'groupId':003,
            'owner':"Charlie",
            'person':["Charlie","David"]
        },
        {
            'groupId':004,
            'owner':"David",
            'person':["David","Alice"]
        }
    ],

    'c3_input':[
        {
            'recordId':001,
            'MappedGPId':001,
            'content':[
                {'speaker':'001',
                'content':'Hello Everyone, I am Alice!'
                }       
            ]
        },
        {
            'recordId':002,
            'MappedGPId':002,
            'content':[
                {'speaker':'002',
                'content':'Grand Bob is coming!'
                }       
            ]
        },
        {
            'recordId':003,
            'MappedGPId':003,
            'content':[
                {'speaker':'003',
                'content':'Yoo, This is Charlie!'
                }       
            ]
        },
        {
            'recordId':004,
            'MappedGPId':004,
            'content':[
                {'speaker':'004',
                'content':'Listen! David is the owner of this chatgroup!'
                }       
            ]
        }
    ]

};



module.exports=config;
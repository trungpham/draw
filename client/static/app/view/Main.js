Ext.define("D.view.Main", {
    id:'mainView',
    extend:'Ext.navigation.View',
    config:
        {
            items:
            [
                {
                    title: 'Draw With Friends',
                    items:
                        [
                            {
                                xtype:'container',
                                left:'50%',
                                items:
                                    [
                                        {
                                            id:'createGame',
                                            top:10,
                                            xtype:'button',
                                            text:'create game',
                                            width:150,
                                            left:-75
                                        }
                                    ]

                            }
                        ]

                }
           ]
        }
});
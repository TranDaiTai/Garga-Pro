module.exports = (sequelize,DataType)=>{
    const product = sequelize.define('Product',
        {
        id:{
            type:DataType.UUID,
            defaultValue : DataType.UUIDV4,
            primaryKey: true
        },
        productname:{

        },
        
        }
    )

    return product;
}
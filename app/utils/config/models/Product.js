const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true
    },
    price: {
        type:Number,
        require:true
    },
    offer: {
        type:String
    },
    image: {
        type:String
    },
    amen: {
        type:[String],
        default:['Ac', 'Greyser', 'Tv', 'Wi-Fi', 'Elevator', 'Break-Fast'],
        set:function(amen) {
            const defaultValues = ['Ac', 'Greyser', 'Tv', 'Wi-Fi', 'Elevator', 'Break-Fast']
            if(typeof amen === 'string') {
                amen = amen.split(',').map(item => item.trim());
            }
            return Array.from(new Set([...defaultValues, ...amen]))
        }
    },
})

const ProductModel = mongoose.models.product || mongoose.model('product', productSchema);
export default ProductModel;
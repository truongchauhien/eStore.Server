import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkShiftSchema = new Schema({
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    workDate: Date,
    startHour: Date,
    endHour: Date,
    isHoliday: {
        type: Boolean,
        default: false
    },
    isWeekend: {
        type: Boolean,
        default: false
    }
});

const WorkShiftModel = mongoose.model('WorkShift', WorkShiftSchema);
export default WorkShiftModel;

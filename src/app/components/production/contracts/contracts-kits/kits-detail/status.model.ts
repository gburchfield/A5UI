export class Status {
    phase: {
        rowSpan: Number;
        title: String;
        progress: String;
    };
    firstTask: {
        title: String;
        status: [{
            start: Date;
            end: Date;
        }]
    };
    restOfTasks: [{
        title: String;
        status: [{
            start: Date;
            end: Date;
        }]
    }]
}
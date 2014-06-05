function Rotation(){};

Rotation.rotationXOffsets = function(angle){
    var offsets = [
        [0, 0],
        [0, 0]
    ];

    offsets[0][0] = Math.cos(3 * Math.PI / 4 - angle) - Math.cos(3 * Math.PI / 4);
    offsets[0][1] = Math.cos(Math.PI / 4 - angle) - Math.cos(Math.PI / 4);
    offsets[1][1] = Math.cos(-Math.PI / 4 - angle) - Math.cos(-Math.PI / 4);
    offsets[1][0] = Math.cos(-3 * Math.PI / 4 - angle) - Math.cos(- 3 * Math.PI / 4);

    return offsets;
};

Rotation.rotationYOffsets = function(angle){
    var offsets = [
        [0, 0],
        [0, 0]
    ];

    offsets[0][0] = Math.sin(3 * Math.PI / 4 - angle) - Math.sin(3 * Math.PI / 4);
    offsets[0][1] = Math.sin(Math.PI / 4 - angle) - Math.sin(Math.PI / 4);
    offsets[1][1] = Math.sin(-Math.PI / 4 - angle) - Math.sin(-Math.PI / 4);
    offsets[1][0] = Math.sin(-3 * Math.PI / 4 - angle) - Math.sin(- 3 * Math.PI / 4);

    return offsets;
};
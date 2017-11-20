/*
 * Organism Annotation Model
 */
const createAnnotation = columnVector =>
    Object.assign(
        {},
        {
            degPrefix: columnVector[0],
            degId: columnVector[1],
            geneName: columnVector[2],
            geneRef: columnVector[3],
            degFunction: columnVector[6],
            organism: columnVector[7],
        }
    );

const hasPrefix = (annotationObj, degPrefix) =>
    annotationObj.degPrefix === degPrefix;

module.exports = {
    createAnnotation: createAnnotation,
    hasPrefix: hasPrefix,
};
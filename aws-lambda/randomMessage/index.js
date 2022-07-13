let messages = [
    "Hello World!",
    "Hello Servless",
    "I can create an AWS lambda",
    "It's so easy",
    "Keep learning",
];

exports.handler = async (event, context) => {
    let message = messages[Math.floor(Math.random()*5)];
    return message;
};

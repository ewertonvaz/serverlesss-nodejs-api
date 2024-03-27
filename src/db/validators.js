const { z } = require("zod");

async function validateLead(postData) {
    const lead = z.object({
        email: z.string().email()
    });

    let hasError;
    let validData = {};
    let message;

    try { 
        validData = lead.parse(postData);
        hasError = false;
        message = 'All good!';
    } catch(e) {
        hasError = true;
        message = 'Data not valid. Try again please!';
    }

    return {
        data: validData,
        hasError: hasError,
        message: message
    }
}

module.exports.validateLead = validateLead
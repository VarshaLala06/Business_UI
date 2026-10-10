
const Client = require("../models/Client");

// CREATE CLIENT
async function createClient(req, res) {
    try {
        const { companyName, contactPerson, email, phone, status } = req.body;

        if (!companyName || !contactPerson || !email || !phone) {
            return res.status(400).json({
                message: "Company name, contact person, email and phone are required"
            });
        }

        const client = await Client.create({
            companyName,
            contactPerson,
            email,
            phone,
            status
        });

        return res.status(201).json({
            message: "Client created successfully",
            client
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

// GET ALL CLIENTS
async function getClients(req, res) {
    try {
        const clients = await Client.find();

        return res.status(200).json({
            count: clients.length,
            clients
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

// GET ONE CLIENT
async function getClientById(req, res) {
    try {
        const { id } = req.params

        const client = await Client.findById(id);

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        return res.status(200).json({ client });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

// UPDATE CLIENT
async function updateClient(req, res) {
    try {
        const { id } = req.params;
        const client = await Client.findByIdAndUpdate(id,req.body,{ new: true });

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json({
            message: "Client updated successfully",
            client
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

// DELETE CLIENT
async function deleteClient(req, res) {
    try {
        const { id } = req.params;
        const client = await Client.findByIdAndDelete(id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        return res.status(200).json({
            message: "Client deleted successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
};

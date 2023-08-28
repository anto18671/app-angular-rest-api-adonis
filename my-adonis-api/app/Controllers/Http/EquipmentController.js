'use strict'

const Equipment = use('App/Models/Equipment')
const { validate } = use('Validator')
const Logger = use('Logger');

class EquipmentController {
    async show({ response }) {
        Logger.info('Test log endpoint hit for show');
        try {
            const equipment = await Equipment.all();
            return response.json(equipment)
        } catch (error) {
            return response.status(500).json({ message: 'Something went wrong!', error: error.message })
        }
    }

    async create({ request, response }) {
        Logger.info('Test log endpoint hit');
        const rules = {
        uid: 'required',
        brand: 'required',
        equipment: 'required'
        }
    
        const validation = await validate(request.all(), rules)
    
        if (validation.fails()) {
            return response.status(400).json(validation.messages())
        }
    
        try {
            const data = request.only(['uid', 'brand', 'equipment'])
            const equipment = await Equipment.create(data)
            return response.json(equipment)
        } catch (error) {
            Logger.error('Error creating equipment:', error.message);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update({ request, response }) {
        try {
            const rules = {
                id: 'required',
                uid: 'required',
                brand: 'required',
                equipment: 'required'
            };
    
            const validation = await validate(request.all(), rules);
    
            if (validation.fails()) {
                return response.status(400).json(validation.messages());
            }
    
            const { id, uid, brand, equipment } = request.all();
    
            const equipmentToUpdate = await Equipment.find(id);
    
            if (!equipmentToUpdate) {
                return response.status(404).json({ error: 'Equipment not found' });
            }
    
            equipmentToUpdate.uid = uid;
            equipmentToUpdate.brand = brand;
            equipmentToUpdate.equipment = equipment;
    
            await equipmentToUpdate.save();
    
            return response.json(equipmentToUpdate);
        } catch (error) {
            console.log('Error object:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete({ params, response }) {
        try {
            const id = params.id;
            console.log('Received equipment ID:', id);
    
            if (!id) {
                return response.status(400).json({ error: 'Equipment ID is missing in the request' });
            }
    
            const equipment = await Equipment.findOrFail(id);
    
            await equipment.delete();
    
            return response.json({ message: 'Equipment deleted successfully!' });
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).json({ error: 'Equipment not found' });
            }
            console.error('Error in delete function:', error.message);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = EquipmentController
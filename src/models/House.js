export class House {
  constructor({ id, bathrooms, rooms, description, imgUrl, price, year, levels }) {
      this.id = id || ''
      this.year = year || 0
      this.rooms = rooms || 0
      this.bathrooms = bathrooms || 0
      this.price = price || 0
      this.imgUrl = imgUrl || ''
      this.description = description || ''
      this.levels = levels || 0
  }
}
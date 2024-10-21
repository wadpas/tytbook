import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
	{
		$match: {
			product: new ObjectId('66e340b9eb8b6350937c80ce'),
		},
	},
	{
		$group: {
			_id: null,
			averageRating: {
				$avg: '$rating',
			},
			numOfReviews: {
				$sum: 1,
			},
		},
	},
]

const client = await MongoClient.connect('')
const coll = client.db('agoda').collection('reviews')
const cursor = coll.aggregate(agg)
const result = await cursor.toArray()
await client.close()

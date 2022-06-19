import { BatchGetItemCommand, DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"


class DbProvider {

    private static dbClient: DynamoDBClient;

    constructor() {
        DbProvider.dbClient = new DynamoDBClient({ region: 'us-west-2', credentials: {} });
    }

    public async getSprints() {
        const getSprintsCommand: ScanCommand = new ScanCommand({
            TableName: 'sprints'
        });
        const results = await DbProvider.dbClient.send(getSprintsCommand);
        return results.Items?.map( item => {
            return { sprint: item.sprint.S, team: item.team.S};
        });
    }
}

export const DynamoConnector = new DbProvider();
/**
 * Defines the contract for any data source, regardless of its underlying technology.
 * This abstraction allows for easy substitution of data sources.
 *
 * @template T The type of the entity this data source will fetch.
 * @template K The type of the identifier (e.g., string for ID, number for index).
 */
export interface IDataSource<T, K = string> {
    /**
     * Fetches a single entity by its identifier.
     * @param id The identifier of the entity.
     * @returns A Promise that resolves to the entity or null if not found.
     */
    fetchOne(id: K): Promise<T | null>;

    /**
     * Fetches all entities of a given type.
     * @param params Optional parameters for filtering, pagination, etc.
     * @returns A Promise that resolves to an array of entities.
     */
    fetchAll(params?: Record<string, any>): Promise<T[]>;

    // Optional: Add other common data operations if consistently applicable
    // create?(data: Partial<T>): Promise<T>;
    // update?(id: K, data: Partial<T>): Promise<T | null>;
    // delete?(id: K): Promise<boolean>;
}
import { Locator } from '@playwright/test';

export class FormHelper {
    static async fillFields(
        fields: { locator: Locator, value: string }[]
    ) {
        for (const field of fields) {
            await field.locator.fill(field.value);
        }
    }
}
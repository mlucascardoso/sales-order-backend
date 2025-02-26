import { Request } from "@sap/cds";

export type FullRequestParams<ExpectedResult> = Request & {
    results: ExpectedResult;
}
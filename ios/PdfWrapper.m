
#import "PdfWrapper.h"
#import <React/RCTUtils.h>

@implementation PdfWrapper

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(isPdfValid:(NSString *)path
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject
                  )
{
    if (path == nil || path.length == 0) {
        return reject(RCTErrorUnspecified, @"Pdf is invalid", nil);
    }

    NSData *data = [[NSFileManager defaultManager] contentsAtPath:path];

    CGDataProviderRef provider = CGDataProviderCreateWithCFData((__bridge CFDataRef)data);
    CGPDFDocumentRef document = CGPDFDocumentCreateWithProvider(provider);

    if (document == nil) {
        return reject(RCTErrorUnspecified, @"Pdf is invalid", nil);
    }

    return resolve(path);
}

@end
  
